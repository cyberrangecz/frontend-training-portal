import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {ActiveTrainingInstanceService} from "../../../../../services/training-instance/active-training-instance.service";
import {interval, merge, of, Subscription} from "rxjs";
import {catchError, map, startWith, switchMap, takeWhile} from "rxjs/operators";
import {AlertService} from "../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {TrainingInstanceFacade} from "../../../../../services/facades/training-instance-facade.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {TrainingRunTableRow} from "../../../../../model/table-adapters/training-run-table-row";
import {PaginatedTable} from "../../../../../model/table-adapters/paginated-table";
import {environment} from "../../../../../../environments/environment";
import {BaseTrainingRunOverview} from "../base-training-run-overview";
import {ActionConfirmationDialog} from "../../../../shared/delete-dialog/action-confirmation-dialog.component";
import {SandboxInstanceFacade} from "../../../../../services/facades/sandbox-instance-facade.service";
import {TablePagination} from "../../../../../model/DTOs/other/table-pagination";

@Component({
  selector: 'kypo2-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.css']
})
/**
 * Component for displaying summary of training in form of a material table
 */
export class ActiveTrainingRunOverviewComponent extends BaseTrainingRunOverview implements OnInit {

  displayedColumns: string[] = ['sandboxInstanceId', 'sandboxInstanceState', 'player', 'state', 'actions'];
  activeTrainingRunsDataSource: MatTableDataSource<TrainingRunTableRow>;

  resultsLength = 0;
  isLoadingTrainingRunResults = true;
  isLoadingSandboxResults = true;
  isInErrorState = false;
  now: number;

  toAllocateInput: number;
  hasSandboxesInfoError = false;
  sandboxDeletionRunningCount: number;
  sandboxAllocationRunningCount: number;
  sandboxFailedCount: number;
  sandboxAvailableCount: number;
  sandboxCanBeAllocatedCount: number;

  @ViewChild(MatPaginator, { static: true }) activeTrainingRunsPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) activeTrainingRunSort: MatSort;


  constructor(
    activeTrainingInstanceService: ActiveTrainingInstanceService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private sandboxInstanceFacade: SandboxInstanceFacade,
    private trainingInstanceFacade: TrainingInstanceFacade) {
    super(activeTrainingInstanceService)
  }

  ngOnInit() {
    super.ngOnInit();
    this.startCurrentTimePeriodicalUpdate();

  }

  /**
   * Reverts selected training run
   * @param row table object of training run
   */
  deleteSandboxOfTrainingRun(row: TrainingRunTableRow) {
    if (row.trainingRun.hasPlayer() && row.trainingRun.isRunning()) {
      this.askForDeleteSandboxConfirmation(row);
    } else {
      this.sendRequestToDeleteSandbox(row);
    }
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.activeTrainingRunsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.activeTrainingRunsDataSource.paginator) {
      this.activeTrainingRunsDataSource.paginator.firstPage();
    }
  }

  /**
   * Creates table data source from training runs retrieved from a server.
   */
   protected initDataSource() {
    this.activeTrainingRunSort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.activeTrainingRunsPaginator.pageIndex = 0);
    this.activeTrainingRunsPaginator.pageSize = environment.defaultPaginationSize;
    this.activeTrainingRunSort.active = 'state';
    this.activeTrainingRunSort.direction = 'desc';
    this.fetchTrainingRuns();
  }

  /**
   * Fetch data from server
   */
  protected fetchData() {
    this.fetchTrainingRuns();
    this.fetchInfoForSandboxes();
  }

  private fetchInfoForSandboxes() {
    let timeoutHandle = window.setTimeout(() => this.isLoadingSandboxResults = true, environment.defaultDelayToDisplayLoading);
    this.sandboxInstanceFacade.getSandboxesInPool(this.trainingInstance.poolId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        sandboxes => {
            window.clearTimeout(timeoutHandle);
            this.isLoadingSandboxResults = false;
            this.hasSandboxesInfoError = false;
            this.sandboxFailedCount = sandboxes.filter(sandbox => sandbox.isFailed()).length;
            this.sandboxDeletionRunningCount = sandboxes.filter(sandbox => sandbox.isBeingDeleted()).length;
            this.sandboxAllocationRunningCount = sandboxes.filter(sandbox => sandbox.isInProgress()).length - this.sandboxDeletionRunningCount;
            this.sandboxAvailableCount = sandboxes.filter(sandbox => sandbox.isCreated()).length - this.resultsLength;
            this.sandboxCanBeAllocatedCount = Math.max(0, this.trainingInstance.poolSize - sandboxes.length - this.sandboxFailedCount);
            if (this.toAllocateInput === undefined) {
              this.toAllocateInput = this.sandboxCanBeAllocatedCount;
            }
          },
          err => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingSandboxResults = false;
          this.hasSandboxesInfoError = true;
        }
      )
  }

  private fetchTrainingRuns() {
    let timeoutHandle = 0;
    const pagination = new TablePagination(this.activeTrainingRunsPaginator.pageIndex,
      this.activeTrainingRunsPaginator.pageSize,
      this.activeTrainingRunSort.active,
      this.activeTrainingRunSort.direction);

    merge(this.activeTrainingRunSort.sortChange, this.activeTrainingRunsPaginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          timeoutHandle = window.setTimeout(() => this.isLoadingTrainingRunResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingInstanceFacade.getTrainingRunsByTrainingInstanceIdPaginated(this.trainingInstance.id, pagination);
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingTrainingRunResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError(() => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingTrainingRunResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe((data: PaginatedTable<TrainingRunTableRow[]>) => this.createDataSource(data.tableData));
  }

  /**
   * Creates data source from fetched data
   * @param data fetched training runs
   */
  private createDataSource(data: TrainingRunTableRow[]) {
    this.activeTrainingRunsDataSource = new MatTableDataSource(data);
    this.activeTrainingRunsDataSource.filterPredicate =
      (data: TrainingRunTableRow, filter: string) =>
        data.trainingRun.state.toLowerCase().indexOf(filter) !== -1
  }


  private askForDeleteSandboxConfirmation(row: TrainingRunTableRow) {
    const sandboxId: string = row.trainingRun.sandboxInstanceId ? row.trainingRun.sandboxInstanceId.toString() : '';
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'sandbox instance',
        title: sandboxId,
        action: 'delete'
      }
    });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteSandbox(row)
      }
    });
  }

  private sendRequestToAllocateSandboxes(count: number) {
    this.sandboxInstanceFacade.allocateSandbox(this.trainingInstance.id, count)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Allocation of sandboxes has begun');
          this.fetchInfoForSandboxes();
        },
        err => {
          this.errorHandler.displayInAlert(err, 'Allocation of sandboxes');
        }
      )
  }

  private sendRequestToDeleteSandbox(row: TrainingRunTableRow) {
    row.deletionRequested = true;
    this.sandboxInstanceFacade.deleteSandbox(this.trainingInstance.id, row.trainingRun.sandboxInstanceId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      response => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Deletion of sandbox instance has started');
        this.fetchData();
      },
      err => {
        row.deletionRequested = false;
        this.errorHandler.displayInAlert(err, 'Deletion sandbox instance');
      }
    )
  }

  private startCurrentTimePeriodicalUpdate() {
    this.now = Date.now();
    interval(60000)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(value =>
      this.now = Date.now()
    );
  }

}
