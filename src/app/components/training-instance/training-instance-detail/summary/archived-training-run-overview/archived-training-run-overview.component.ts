import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap, takeWhile} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {RequestedPagination} from '../../../../../model/DTOs/other/requested-pagination';
import {PaginatedResource} from '../../../../../model/table-adapters/paginated-resource';
import {TrainingRunTableRow} from '../../../../../model/table-adapters/training-run-table-row';
import {TrainingInstanceFacade} from '../../../../../services/facades/training-instance-facade.service';
import {TrainingRunFacade} from '../../../../../services/facades/training-run-facade.service';
import {AlertService} from '../../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {ActiveTrainingInstanceService} from '../../../../../services/training-instance/active-training-instance.service';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {BaseTrainingRunOverview} from '../base-training-run-overview';

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
    this.archivedTrainingRunSort.active = 'id';
    this.archivedTrainingRunSort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetch data from server
   */
  protected fetchData() {
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
          this.errorHandler.display(err, 'Obtaining training run data');
          return of([]);
        })
      ).subscribe(
        (data: PaginatedResource<TrainingRunTableRow[]>) =>
          this.archivedTrainingRunsDataSource = new MatTableDataSource(data.elements)
    );
  }

  private sendRequestToDeleteArchivedTrainingRuns() {
    const idsToDelete: number[] = this.archivedTrainingRunsDataSource.data.map(row => row.trainingRun.id);
    this.trainingRunFacade.deleteMultiple(idsToDelete)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.display(err, 'Deleting training runs'));
  }

  private sendRequestToDeleteArchivedTrainingRun(id: number) {
    this.trainingRunFacade.delete(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        deleted => this.fetchData(),
        err => this.errorHandler.display(err, 'Deleting training run'));
  }
}
