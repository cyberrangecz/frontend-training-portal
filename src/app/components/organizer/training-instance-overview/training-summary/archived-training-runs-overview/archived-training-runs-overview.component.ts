import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {TrainingRunTableAdapter} from "../../../../../model/table-adapters/training-run-table-adapter";
import {BaseTrainingRunsOverview} from "../base-training-runs-overview";
import {AlertService} from "../../../../../services/shared/alert.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {TrainingInstanceFacade} from "../../../../../services/facades/training-instance-facade.service";
import {environment} from "../../../../../../environments/environment";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap, takeWhile} from "rxjs/operators";
import {PaginatedTable} from "../../../../../model/table-adapters/paginated-table";
import {TrainingRunFacade} from "../../../../../services/facades/training-run-facade.service";
import {MatDialog} from "@angular/material";
import {ActionConfirmationDialog} from "../../../../shared/delete-dialog/action-confirmation-dialog.component";

@Component({
  selector: 'archived-training-runs-overview',
  templateUrl: './archived-training-runs-overview.component.html',
  styleUrls: ['./archived-training-runs-overview.component.css']
})
export class ArchivedTrainingRunsOverviewComponent extends BaseTrainingRunsOverview implements OnInit {

  displayedColumns: string[] = ['player', 'state', 'actions'];
  archivedTrainingRunsDataSource: MatTableDataSource<TrainingRunTableAdapter>;

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

  deleteArchivedTrainingRuns() {
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'archived training runs',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRuns()
      }
    });
  }

  deleteTrainingRun(id: number) {
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'archived training run',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRun(id)
      }
    });
  }


  /**
   * Creates table data source from training runs retrieved from a server.
   */
  protected initDataSource() {
    this.activeTrainingRunSort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.activeTrainingRunsPaginator.pageIndex = 0);
    this.activeTrainingRunsPaginator.pageSize = environment.defaultPaginationSize;
    this.activeTrainingRunSort.active = 'id';
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
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          timeoutHandle = window.setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingInstanceFacade.getTrainingRunsByTrainingInstanceIdWithPagination(this.trainingInstance.id,
            this.activeTrainingRunsPaginator.pageIndex, this.activeTrainingRunsPaginator.pageSize, this.activeTrainingRunSort.active, this.activeTrainingRunSort.direction, false)
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
      ).subscribe(
        (data: PaginatedTable<TrainingRunTableAdapter[]>) =>
          this.archivedTrainingRunsDataSource = new MatTableDataSource(data.tableData)
    );
  }

  private sendRequestToDeleteArchivedTrainingRuns() {
    const idsToDelete: number[] = this.archivedTrainingRunsDataSource.data.map(row => row.trainingRun.id);
    this.trainingRunFacade.deleteTrainingRuns(idsToDelete)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.displayInAlert(err, 'Deleting training runs'))
  }

  private sendRequestToDeleteArchivedTrainingRun(id: number) {
    this.trainingRunFacade.deleteTrainingRun(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.displayInAlert(err, 'Deleting training run'))
  }
}
