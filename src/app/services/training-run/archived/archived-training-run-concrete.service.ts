import {Injectable} from '@angular/core';
import {EMPTY, merge, Observable, Subject, timer} from 'rxjs';
import {TrainingRunTableRow} from '../../../model/table/row/training-run-table-row';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {TrainingRunApi} from '../../api/training-run-api.service';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {retryWhen, switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {environment} from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../shared/alert.service';
import {TrainingInstance} from '../../../model/training/training-instance';
import {ArchivedTrainingRunService} from './archived-training-run.service';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-layout';
import {MatDialog} from '@angular/material/dialog';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get archived training runs and poll in regular intervals.
 */
@Injectable()
export class ArchivedTrainingRunConcreteService extends ArchivedTrainingRunService {

  private lastPagination: RequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private trainingInstance: TrainingInstance;
  /**
   * List of archived training runs with currently selected pagination options
   */

  archivedTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow>>;

  constructor(
    private trainingRunFacade: TrainingRunApi,
    private dialog: MatDialog,
    private trainingInstanceFacade: TrainingInstanceApi,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService
  ) {
    super();
  }

  /**
   * Initiates polling for archived training runs of passed training instance
   * @param trainingInstance which archived training runs should be polled
   */
  startPolling(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.lastPagination = new RequestedPagination(0, environment.defaultPaginationSize, '', '');
    const poll$ = this.createPoll();
    this.archivedTrainingRuns$ = merge(poll$, this.resourceSubject$.asObservable());
  }

  /**
   * Gel all archived training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which archived training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade
      .getAssociatedTrainingRuns(trainingInstanceId, pagination, false)
      .pipe(
        tap(
          runs => {
            this.resourceSubject$.next(runs);
          },
          err => this.onGetAllError()
        )
      );
  }

  /**
   * Displays dialog to confirm deleting training run and refreshes list of all archived training runs
   * as a side effect or handles error
   * @param id of archived training run to delete
   */
  delete(id: number): Observable<PaginatedResource<TrainingRunTableRow>> {
    return this.displayDialogToDelete()
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
        ? this.callApiToDelete(id)
        : EMPTY)
      );
  }

  /**
   * Displays dialog to confirm deleting selected archived training runs and refreshes list of all archived training runs
   * as a side effect or handles error
   * @param idsToDelete ids of archived training run to delete
   */
  deleteMultiple(idsToDelete: number[]): Observable<PaginatedResource<TrainingRunTableRow>> {
    return this.displayDialogToDelete(true)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToDeleteMultiple(idsToDelete)
          : EMPTY)
      );
  }

  protected repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade
      .getAssociatedTrainingRuns(
        this.trainingInstance.id,
        this.lastPagination,
        false
      )
      .pipe(tap({ error: err => this.onGetAllError() }));
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }

  protected createPoll(): Observable<PaginatedResource<TrainingRunTableRow>> {
    return timer(0, environment.organizerSummaryPollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$)
      );
  }

  protected onManualGetAll(pagination: RequestedPagination) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private displayDialogToDelete(multiple = false): Observable<CsirtMuDialogResultEnum> {
    const title = multiple ? 'Delete Training Runs' : 'Delete Training Run';
    const message = multiple
      ? `Do you want to delete the training run?`
      : 'Do you want to delete selected training runs?';

    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        title,
        message,
        'Cancel',
        'Delete'
      )
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(id: number): Observable<PaginatedResource<TrainingRunTableRow>> {
    return this.trainingRunFacade.delete(id).pipe(
      tap({
        error: err => this.errorHandler.emit(err, 'Deleting training run')
      }),
      switchMap(() => this.getAll(this.trainingInstance.id, this.lastPagination))
    );
  }

  private callApiToDeleteMultiple(idsToDelete: number[]): Observable<PaginatedResource<TrainingRunTableRow>> {
    return this.trainingRunFacade.deleteMultiple(idsToDelete)
      .pipe(
        tap({
          error: err => this.errorHandler.emit(err, 'Deleting training runs')
        }),
        switchMap(() => this.getAll(this.trainingInstance.id, this.lastPagination))
      );
  }

}
