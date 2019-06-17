import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {AlertService} from "../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {TrainingInstanceFacade} from "../../../../../services/facades/training-instance-facade.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {TrainingRunTableAdapter} from "../../../../../model/table-adapters/training-run-table-adapter";
import {PaginatedTable} from "../../../../../model/table-adapters/paginated-table";
import {environment} from "../../../../../../environments/environment";
import {TrainingRunFacade} from "../../../../../services/facades/training-run-facade.service";
import {BaseTrainingRunsOverview} from "../base-training-runs-overview";
import {TrainingRunStateEnum} from "../../../../../model/enums/training-run-state.enum";
import {ActionConfirmationDialog} from "../../../../shared/delete-dialog/action-confirmation-dialog.component";

@Component({
  selector: 'active-training-runs-overview',
  templateUrl: './active-training-runs-overview.component.html',
  styleUrls: ['./active-training-runs-overview.component.css']
})
/**
 * Component for displaying summary of training in form of a material table
 */
export class ActiveTrainingRunsOverviewComponent extends BaseTrainingRunsOverview implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxInstanceId', 'sandboxInstanceState', 'player', 'state', 'actions'];
  activeTrainingRunsDataSource: MatTableDataSource<TrainingRunTableAdapter>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator, { static: true }) activeTrainingRunsPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) activeTrainingRunSort: MatSort;

  constructor(
    activeTrainingInstanceService: ActiveTrainingInstanceService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade) {
    super(activeTrainingInstanceService)
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * Reverts selected training run
   * @param row table object of training run
   */
  revertTrainingRun(row: TrainingRunTableAdapter) {
    if (row.trainingRun.player && row.trainingRun.state === TrainingRunStateEnum.Allocated) {
      this.askForRevertConfirmation(row);
    } else {
      this.sendRequestToRevertTrainingRun(row.trainingRun.id);
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
    this.activeTrainingRunSort.sortChange.subscribe(() => this.activeTrainingRunsPaginator.pageIndex = 0);
    this.activeTrainingRunsPaginator.pageSize = environment.defaultPaginationSize;
    this.activeTrainingRunSort.active = 'state';
    this.activeTrainingRunSort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetch data from server
   */
  protected fetchData() {
    let timeoutHandle = 0;
    merge(this.activeTrainingRunSort.sortChange, this.activeTrainingRunsPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          timeoutHandle = setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingInstanceFacade.getTrainingRunsByTrainingInstanceIdWithPagination(this.trainingInstance.id,
            this.activeTrainingRunsPaginator.pageIndex, this.activeTrainingRunsPaginator.pageSize, this.activeTrainingRunSort.active, this.activeTrainingRunSort.direction)
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError(() => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe((data: PaginatedTable<TrainingRunTableAdapter[]>) => this.createDataSource(data.tableData));
  }

  /**
   * Creates data source from fetched data
   * @param data fetched training runs
   */
  private createDataSource(data: TrainingRunTableAdapter[]) {
    this.activeTrainingRunsDataSource = new MatTableDataSource(data);
    this.activeTrainingRunsDataSource.filterPredicate =
      (data: TrainingRunTableAdapter, filter: string) =>
        data.trainingRun.state.toLowerCase().indexOf(filter) !== -1
  }


  private askForRevertConfirmation(row: TrainingRunTableAdapter) {
    const sandboxId: string = row.trainingRun.sandboxInstanceId ? row.trainingRun.sandboxInstanceId.toString() : '';
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'sandbox instance',
        title: sandboxId,
        action: 'revert'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToRevertTrainingRun(row.trainingRun.id)
      }
    });
  }

  private sendRequestToRevertTrainingRun(trainingRunId: number) {
    this.trainingRunFacade.revert(trainingRunId).subscribe(
      response => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Training run was successfully reverted');
      },
      err => {
        this.errorHandler.displayInAlert(err, 'Reverting training run');
      }
    )
  }

}
