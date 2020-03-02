import {Injectable} from '@angular/core';
import {EMPTY, merge, Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../../model/table/row/training-run-table-row';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {retryWhen, switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {TrainingInstance} from '../../../model/training/training-instance';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {ActiveTrainingRunService} from './active-training-run.service';
import {TrainingRun} from '../../../model/training/training-run';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum,
} from 'csirt-mu-layout';
import {MatDialog} from '@angular/material/dialog';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get active training runs and poll in regular intervals.
 */
@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunService {

  private lastPagination: RequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private trainingInstance: TrainingInstance;

  constructor(private trainingInstanceFacade: TrainingInstanceApi,
              private sandboxInstanceFacade: SandboxInstanceApi,
              private dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Initiates polling for active training runs of passed training instance
   * @param trainingInstance which active training runs should be polled
   */
  startPolling(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.lastPagination = new RequestedPagination(0, environment.defaultPaginationSize, '', '');
    const poll$ = this.createPoll();
    this.resource$ = merge(poll$, this.resourceSubject$.asObservable());
  }

  /**
   * Gel all active training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which active training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(trainingInstanceId, pagination)
      .pipe(
        tap( runs => {
            this.resourceSubject$.next(runs);
          },
          err => this.onGetAllError()
        )
      );
  }

  /**
   * Delete sandbox instance associated with training instance and refreshes list of all active training runs
   * as a side effect or handles error
   * @param trainingRun training run whose sandbox should be deleted
   */
  deleteSandbox(trainingRun: TrainingRun): Observable<any> {
    if (trainingRun.hasPlayer() && trainingRun.isRunning()) {
      return this.displayDeleteSandboxDialog(trainingRun)
        .pipe(
          switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToDeleteSandbox(trainingRun)
          : EMPTY
          )
        );
    } else {
      return this.callApiToDeleteSandbox(trainingRun);
    }

  }

  private displayDeleteSandboxDialog(trainingRun: TrainingRun): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Sandbox Instance',
        `Do you want to delete sandbox instance of player "${trainingRun?.player?.name}"?`,
        'Cancel',
        'Delete'
      )
    });
    return dialogRef.afterClosed();
  }

  private callApiToDeleteSandbox(trainingRun): Observable<PaginatedResource<TrainingRunTableRow>> {
    return this.sandboxInstanceFacade.delete(trainingRun.sandboxInstanceId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Deleting of sandbox instance started'),
          err => this.errorHandler.emit(err, 'Deleting sandbox instance')
        ),
        switchMap(_ => this.getAll(trainingRun.trainingInstanceId, this.lastPagination))
      );
  }

  private repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(this.trainingInstance.id, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError()})
      );
  }

  private onGetAllError() {
    this.hasErrorSubject$.next(true);
  }

  private onManualGetAll(pagination: RequestedPagination) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private createPoll(): Observable<PaginatedResource<TrainingRunTableRow>> {
    return timer(0, environment.organizerSummaryPollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$)
      );
  }
}
