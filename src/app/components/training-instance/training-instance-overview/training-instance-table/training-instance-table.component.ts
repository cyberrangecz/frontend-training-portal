import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Kypo2AuthService} from 'kypo2-auth';
import {interval, merge, Observable, of} from 'rxjs';
import {catchError, map, skipWhile, startWith, switchMap, takeWhile} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';
import {TrainingInstanceTableRow} from '../../../../model/table/row/training-instance-table-row';
import {SandboxInstanceAllocationState} from '../../../../model/training/sandbox-instance-allocation-state';
import {TrainingInstance} from '../../../../model/training/training-instance';
import {StringNormalizer} from '../../../../model/utils/ignore-diacritics-filter';
import {TrainingInstanceFacade} from '../../../../services/facades/training-instance-facade.service';
import {AlertService} from '../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {SandboxAllocationService} from '../../../../services/training-instance/sandbox-allocation/sandbox-allocation.service';
import {BaseComponent} from '../../../base.component';
import {ActionConfirmationDialogComponent} from '../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AllocationModalComponent} from './allocation-modal/allocation-modal.component';

@Component({
  selector: 'kypo2-training-instance-table',
  templateUrl: './training-instance-table.component.html',
  styleUrls: ['./training-instance-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ],
})

/**
 * Component for list of training instance displayed in form of an expandable table. Organizer can allocate sandboxes through table
 * or expanded detail.
 */
export class TrainingInstanceTableComponent extends BaseComponent implements OnInit, OnDestroy {

  @Output() edit: EventEmitter<TrainingInstance> = new EventEmitter();

  displayedColumns: string[] = ['id', 'title', 'date', 'trainingDefinition', 'poolSize', 'pool-id', 'accessToken', 'actions'];

  dataSource: MatTableDataSource<TrainingInstanceTableRow>;

  resultsLength = 0;
  isInErrorState = false;
  expandedRow: TrainingInstanceTableRow;
  now: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private allocationService: SandboxAllocationService,
    private authService: Kypo2AuthService,
    private trainingInstanceFacade: TrainingInstanceFacade) {
    super();
  }

  ngOnInit() {
    this.initCurrentTimePeriodicalUpdate();
    this.initTableDataSource();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.allocationService.dispose();
  }

  editTraining(training: TrainingInstance) {
    this.edit.emit(training);
  }

  /**
   * Opens popup dialog to confirm if the user really wants to delete the training instance. If the action is
   * confirmed, training instance is removed and REST API called to remove training from endpoint
   * @param {TrainingInstanceTableRow} training training instance which should be removed
   */
  deleteTraining(training: TrainingInstanceTableRow) {

    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'Training Instance',
        action: 'delete',
        title: training.trainingInstance.title,
        additionalInfo: training.trainingInstance.isActive(this.now) ? 'This training instance is in progress.' : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteTrainingInstance(training.trainingInstance.id);
      }
    });
  }

  /**
   *
   * @param {number} id
   */
  archiveTraining(id: number) {
    this.trainingInstanceFacade.download(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {
      },
      err => {
          this.errorHandler.display(err, 'Downloading Training Instance archive');
      });
  }

  allocateTrainingInstanceSandboxes(row: TrainingInstanceTableRow) {
    const dialogRef = this.dialog.open(AllocationModalComponent, {
      data: row.trainingInstance.poolSize - row.allocatedSandboxesCount
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.startAllocation(row, result.payload);
        }
      });
  }

  private startAllocation(row: TrainingInstanceTableRow, count: number) {
    row.isAllocationInProgress = true;
    row.allocation$ = this.allocationService.allocateSandboxes(row.trainingInstance, count);
    row.allocation$
      .pipe(
        takeWhile(() => this.isAlive),
        skipWhile(state => !state.wasUpdated || state.sandboxes.length === 0)
      )
      .subscribe(
        allocationState => this.onAllocationUpdate(allocationState, row),
        err => this.onAllocationUpdateError(err, row)
      );
  }


  onAllocationEvent(allocation$: Observable<SandboxInstanceAllocationState>, instanceRow: TrainingInstanceTableRow) {
    allocation$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      allocationState => this.onAllocationUpdate(allocationState, instanceRow),
      err => this.onAllocationUpdateError(err, instanceRow)
    );
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = StringNormalizer.normalizeDiacritics(filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Creates table data source from training instances retrieved from a server. Only training instances where
   * active user is listed as an organizer are shown
   */
  private initTableDataSource() {
    this.sort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'title';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetches data from the server
   */
  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          return this.trainingInstanceFacade.getPaginated({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sort: this.sort.active,
            sortDir: this.sort.direction
          });
        }),
        map( trainingInstancesData => {
          this.resolveAllocationStateForTable(trainingInstancesData);
          return trainingInstancesData;
        }),
        map(data => {
          this.isInErrorState = false;
          this.resultsLength = data.pagination.totalElements;
          return data;
        }),
        catchError((err) => {
          this.isInErrorState = true;
          this.errorHandler.display(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe((data: PaginatedResource<TrainingInstanceTableRow[]>) => this.createDataSource(data));
  }
  /**
   * Creates data source from fetched data
   * @param data fetched data
   */
  private createDataSource(data: PaginatedResource<TrainingInstanceTableRow[]>) {
    this.dataSource = new MatTableDataSource(data.elements);
    this.dataSource.filterPredicate =
      (data: TrainingInstanceTableRow, filter: string) =>
        data.normalizedTitle.indexOf(filter) !== -1;
  }


  private resolveAllocationStateForTable(data: PaginatedResource<TrainingInstanceTableRow[]>) {
    data.elements.forEach(row => this.getAllocationState(row));
  }

  private getAllocationState(row: TrainingInstanceTableRow) {
    if (row.trainingInstance.hasPoolId()) {
      this.allocationService.getRunningAllocationState(row.trainingInstance)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          allocationState => this.onAllocationUpdate(allocationState, row),
          err => this.onAllocationUpdateError(err, row),
        );
    } else {
      row.allocatedSandboxesCount = 0;
      row.failedSandboxesCount = 0;
      row.isAllocationInProgress = false;
      row.isAllocationFailed = false;
      row.areSandboxDataLoaded = true;
    }
  }


  private onAllocationUpdate(allocationState: SandboxInstanceAllocationState, row: TrainingInstanceTableRow) {
    row.isAllocationInProgress = allocationState.isInProgress;
    row.allocatedSandboxesCount = allocationState.allocatedCount;
    row.failedSandboxesCount = allocationState.failedCount;
    row.isAllocationFailed = allocationState.hasFailedSandboxes;
    row.areSandboxDataLoaded = allocationState.wasUpdated;
  }

  private onAllocationUpdateError(err, row: TrainingInstanceTableRow) {
    row.isAllocationInProgress = false;
    row.areSandboxDataLoaded = true;
    this.errorHandler.display(err, 'Allocation of sandboxes');
  }


  private sendRequestToDeleteTrainingInstance(trainingInstanceId: number) {
    this.trainingInstanceFacade.delete(trainingInstanceId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully deleted.');
          this.fetchData();
        },
        err => this.errorHandler.display(err, 'Deleting Training Instance')
      );
  }

  private initCurrentTimePeriodicalUpdate() {
    const period = 60000;
    this.now = Date.now();
    interval(period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.now = Date.now());
  }
}
