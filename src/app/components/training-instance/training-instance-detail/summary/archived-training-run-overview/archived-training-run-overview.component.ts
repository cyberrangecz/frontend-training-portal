import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {TrainingRunTableRow} from '../../../../../model/table-adapters/training-run-table-row';
import {BaseTrainingRunOverview} from '../base-training-run-overview';
import {AlertService} from '../../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {TrainingInstanceFacade} from '../../../../../services/facades/training-instance-facade.service';
import {environment} from '../../../../../../environments/environment';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap, takeWhile} from 'rxjs/operators';
import {PaginatedTable} from '../../../../../model/table-adapters/paginated-table';
import {TrainingRunFacade} from '../../../../../services/facades/training-run-facade.service';
import {MatDialog} from '@angular/material';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {RequestedPagination} from '../../../../../model/DTOs/other/requested-pagination';

@Component({
  selector: 'kypo2-archived-training-run-overview',
  templateUrl: './archived-training-run-overview.component.html',
  styleUrls: ['./archived-training-run-overview.component.scss']
})
/**
 * Component displaying real time archived (accessed by trainee and with sandbox removed) training runs for organizer.
 */
export class ArchivedTrainingRunOverviewComponent extends BaseTrainingRunOverview implements OnInit {

  displayedColumns: string[] = ['player', 'state', 'actions'];
  archivedTrainingRunsDataSource: MatTableDataSource<TrainingRunTableRow>;

  resultsLength = 0;
  isInErrorState = false;

  @ViewChild(MatPaginator, { static: true }) archivedTrainingRunsPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) archivedTrainingRunSort: MatSort;

  constructor(
    activeTrainingInstanceService: ActiveTrainingInstanceService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade) {
    super(activeTrainingInstanceService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  deleteArchivedTrainingRuns() {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'archived training runs',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRuns();
      }
    });
  }

  deleteTrainingRun(id: number) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'archived training run',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRun(id);
      }
    });
  }


  /**
   * Creates table data source from training runs retrieved from a server.
   */
  protected initDataSource() {
    this.archivedTrainingRunSort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.archivedTrainingRunsPaginator.pageIndex = 0);
    this.archivedTrainingRunsPaginator.pageSize = environment.defaultPaginationSize;
    this.archivedTrainingRunSort.active = 'id';
    this.archivedTrainingRunSort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetch data from server
   */
  protected fetchData() {
    let timeoutHandle = 0;
    const pagination = new RequestedPagination(this.archivedTrainingRunsPaginator.pageIndex,
      this.archivedTrainingRunsPaginator.pageSize,
      this.archivedTrainingRunSort.active,
      this.archivedTrainingRunSort.direction);

    merge(this.archivedTrainingRunSort.sortChange, this.archivedTrainingRunsPaginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(this.trainingInstance.id, pagination, false);
        }),
        map(data => {

          this.isInErrorState = false;
          this.resultsLength = data.pagination.totalElements;
          return data;
        }),
        catchError(err => {
          this.isInErrorState = true;
          this.errorHandler.displayInAlert(err, 'Obtaining training run data');
          return of([]);
        })
      ).subscribe(
        (data: PaginatedTable<TrainingRunTableRow[]>) =>
          this.archivedTrainingRunsDataSource = new MatTableDataSource(data.rows)
    );
  }

  private sendRequestToDeleteArchivedTrainingRuns() {
    const idsToDelete: number[] = this.archivedTrainingRunsDataSource.data.map(row => row.trainingRun.id);
    this.trainingRunFacade.deleteMultiple(idsToDelete)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.displayInAlert(err, 'Deleting training runs'));
  }

  private sendRequestToDeleteArchivedTrainingRun(id: number) {
    this.trainingRunFacade.delete(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.displayInAlert(err, 'Deleting training run'));
  }
}
