import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {AlertService} from "../../../../services/shared/alert.service";
import {TrainingInstanceFacade} from "../../../../services/facades/training-instance-facade.service";
import {TrainingEditPopupComponent} from "./training-edit-popup/training-edit-popup.component";
import {interval, merge, Observable, of, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap, takeWhile, tap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../model/enums/alert-type.enum";
import {TrainingInstanceTableAdapter} from "../../../../model/table-adapters/training-instance-table-adapter";
import {PaginatedTable} from "../../../../model/table-adapters/paginated-table";
import {SandboxInstanceFacade} from "../../../../services/facades/sandbox-instance-facade.service";
import {SandboxAllocationService} from "../../../../services/organizer/sandbox-allocation/sandbox-allocation.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TrainingInstanceSandboxAllocationState} from '../../../../model/training/training-instance-sandbox-allocation-state';
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {ActionConfirmationDialog} from "../../../shared/delete-dialog/action-confirmation-dialog.component";
import {Kypo2AuthService} from 'kypo2-auth';
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'training-instances-table',
  templateUrl: './training-instances-table.component.html',
  styleUrls: ['./training-instances-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    ],
})

/**
 * Component for list of training instance displayed in form of a table. Only training instances where the active user is listed as an organizer is shown
 */
export class TrainingInstancesTableComponent extends BaseComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'date', 'trainingDefinition', 'poolSize', 'accessToken', 'actions'];

  dataSource: MatTableDataSource<TrainingInstanceTableAdapter>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;
  expandedRow: TrainingInstanceTableAdapter;
  now: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private allocationService: SandboxAllocationService,
    private authService: Kypo2AuthService,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private sandboxInstanceFacade: SandboxInstanceFacade) {
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
  /**
   * Reloads data and creates new table data source
   */
  refreshData() {
    this.now = Date.now();
    this.fetchData();
  }

  /**
   * Opens popup dialog with component for editing existing training instance
   * @param {TrainingInstance} training training instance which should be edited
   */
  editTraining(training: TrainingInstance) {
    const dialogRef = this.dialog.open(TrainingEditPopupComponent, {
      data: training
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.refreshData();
      }
    });
  }

  /**
   * Opens popup dialog to confirm if the user really wants to delete the training instance. If the action is
   * confirmed, training instance is removed and REST API called to remove training from endpoint
   * @param {TrainingInstanceTableAdapter} training training instance which should be removed
   */
  deleteTraining(training: TrainingInstanceTableAdapter) {

    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
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
    this.trainingInstanceFacade.downloadTrainingInstance(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => {
      },
      err => {
          this.errorHandler.displayInAlert(err, 'Downloading Training Instance archive');
      });
  }

  allocateTrainingInstanceSandboxes(row: TrainingInstanceTableAdapter) {
    row.isAllocationInProgress = true;
    row.allocation$ = this.allocationService.allocateSandboxes(row.trainingInstance);
    row.allocation$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        allocationState => this.onAllocationUpdate(allocationState, row),
        err => this.onAllocationUpdateError(err, row)
      );
  }


  onAllocationEvent(allocation$: Observable<TrainingInstanceSandboxAllocationState>, instanceRow: TrainingInstanceTableAdapter) {
    allocation$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      allocationState => this.onAllocationUpdate(allocationState, instanceRow),
      err => this.onAllocationUpdateError(err, instanceRow)
    )
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    let timeoutHandle = 0;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          timeoutHandle =  window.setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingInstanceFacade.getTrainingInstancesWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map( trainingInstancesData => {
          this.resolveAllocationStateForTable(trainingInstancesData);
          return trainingInstancesData;
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError((err) => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayInAlert(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe((data: PaginatedTable<TrainingInstanceTableAdapter[]>) => this.createDataSource(data));
  }
  /**
   * Creates data source from fetched data
   * @param data fetched data
   */
  private createDataSource(data: PaginatedTable<TrainingInstanceTableAdapter[]>) {
    this.dataSource = new MatTableDataSource(data.tableData);
    this.dataSource.filterPredicate =
      (data: TrainingInstanceTableAdapter, filter: string) =>
        data.trainingInstance.title.toLowerCase().indexOf(filter) !== -1;
  }


  private resolveAllocationStateForTable(data: PaginatedTable<TrainingInstanceTableAdapter[]>) {
    data.tableData.forEach(row => this.getAllocationState(row))
  }

  private getAllocationState(row: TrainingInstanceTableAdapter) {
    if (row.trainingInstance.hasPoolId()) {
      this.allocationService.getRunningAllocationState(row.trainingInstance)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(
          allocationState => this.onAllocationUpdate(allocationState, row),
          err => this.onAllocationUpdateError(err, row),
        )
    } else {
      row.allocatedSandboxesCount = 0;
      row.failedSandboxesCount = 0;
      row.isAllocationInProgress = false;
      row.isAllocationFailed = false;
      row.areSandboxDataLoaded = true;
    }
  }


  private onAllocationUpdate(allocationState: TrainingInstanceSandboxAllocationState, row: TrainingInstanceTableAdapter) {
    row.isAllocationInProgress = allocationState.isInProgress;
    row.allocatedSandboxesCount = allocationState.allocatedCount;
    row.failedSandboxesCount = allocationState.failedCount;
    row.isAllocationFailed = allocationState.hasFailedSandboxes;
    row.areSandboxDataLoaded = allocationState.wasUpdated;
  }

  private onAllocationUpdateError(err, row: TrainingInstanceTableAdapter) {
    row.isAllocationInProgress = false;
    row.areSandboxDataLoaded = true;
    this.errorHandler.displayInAlert(err, 'Allocation of sandboxes');
  }


  private sendRequestToDeleteTrainingInstance(trainingInstanceId: number) {
    this.trainingInstanceFacade.deleteTrainingInstance(trainingInstanceId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully deleted.');
          this.fetchData();
        },
        err => this.errorHandler.displayInAlert(err, 'Deleting Training Instance')
      );
  }

  private initCurrentTimePeriodicalUpdate() {
    this.now = Date.now();
    interval(60000)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.now = Date.now());
  }
}
