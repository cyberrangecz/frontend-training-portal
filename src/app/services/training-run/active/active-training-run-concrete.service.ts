import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../../model/table/row/training-run-table-row';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {TrainingInstanceApi} from '../../api/training-instance-api.service';
import {retryWhen, switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TrainingInstance} from '../../../model/training/training-instance';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {ActiveTrainingRunService} from './active-training-run.service';

/**
 * Basic implementation of layer between component and API service.
 * Can manually get active training runs and poll in regular intervals.
 */
@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunService {

  private lastPagination: RequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdated$: BehaviorSubject<PaginatedResource<TrainingRunTableRow[]>> = new BehaviorSubject(this.initSubject());
  private trainingInstance: TrainingInstance;

  activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  constructor(private trainingInstanceFacade: TrainingInstanceApi,
              private sandboxInstanceFacade: SandboxInstanceApi,
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
    this.activeTrainingRuns$ = merge(poll$, this.manuallyUpdated$.asObservable())
      .pipe(
        tap(
          paginatedRuns => this.totalLengthSubject$.next(paginatedRuns.pagination.totalElements)
        )
      );
  }

  /**
   * Gel all active training runs for passed id and pagination and updates related observables or handles error
   * @param trainingInstanceId which active training runs should be requested
   * @param pagination requested pagination
   */
  getAll(trainingInstanceId: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(trainingInstanceId, pagination)
      .pipe(
        tap( runs => {
            this.manuallyUpdated$.next(runs);
            this.totalLengthSubject$.next(runs.pagination.totalElements);
          },
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Delete sandbox instance associated with training instance and refreshes list of all active training runs
   * as a side effect or handles error
   * @param trainingInstanceId associated with sandbox instance
   * @param sandboxId to delete
   */
  deleteSandbox(trainingInstanceId: number, sandboxId: number): Observable<any> {
    return this.sandboxInstanceFacade.delete(sandboxId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Deleting of sandbox instance started'),
          err => this.errorHandler.display(err, 'Deleting sandbox instance')
        ),
        switchMap(_ => this.getAll(trainingInstanceId, this.lastPagination))
      );
  }

  private repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRuns(this.trainingInstance.id, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Obtaining training runs');
    this.hasErrorSubject$.next(true);
  }

  private onManualGetAll(pagination: RequestedPagination) {
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private createPoll(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    return timer(0, environment.organizerSummaryPollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$)
      );
  }

  private initSubject(): PaginatedResource<TrainingRunTableRow[]> {
    return new PaginatedResource(
      [],
      new Pagination(0, 0, environment.defaultPaginationSize, 0, 0)
    );
  }
}
