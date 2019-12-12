import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../environments/environment';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {TrainingInstanceFacade} from '../facades/training-instance-facade.service';
import {retryWhen, switchMap, tap} from 'rxjs/operators';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {TrainingInstance} from '../../model/training/training-instance';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {AlertService} from '../shared/alert.service';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {ActiveTrainingRunService} from '../shared/active-training-run.service';

@Injectable()
export class ActiveTrainingRunConcreteService extends ActiveTrainingRunService {

  private lastPagination: RequestedPagination;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdated$: BehaviorSubject<PaginatedResource<TrainingRunTableRow[]>> = new BehaviorSubject(this.initSubject());
  trainingInstance: TrainingInstance;

  activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  constructor(private trainingInstanceFacade: TrainingInstanceFacade,
              private sandboxInstanceFacade: SandboxInstanceFacade,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  startPolling(trainingInstance: TrainingInstance) {
    this.trainingInstance = trainingInstance;
    this.lastPagination = new RequestedPagination(0, environment.defaultPaginationSize, '', '');
    const poll$ = this.createPoll();
    this.activeTrainingRuns$ = merge(poll$, this.manuallyUpdated$.asObservable())
      .pipe(
        tap(
          paginatedRuns => this.totalLengthSubject.next(paginatedRuns.pagination.totalElements)
        )
      );
  }

  getAll(id: number, pagination: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.onManualGetAll(pagination);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(id, pagination)
      .pipe(
        tap( runs => {
            this.manuallyUpdated$.next(runs);
            this.totalLengthSubject.next(runs.pagination.totalElements);
          },
          err => this.onGetAllError(err)
        )
      );
  }

  deleteSandbox(trainingId: number, sandboxId: number): Observable<any> {
    return this.sandboxInstanceFacade.deleteByTrainingInstance(trainingId, sandboxId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Deleting of sandbox instance started'),
          err => this.errorHandler.display(err, 'Deleting sandbox instance')
        ),
        switchMap(_ => this.getAll(trainingId, this.lastPagination))
      );
  }

  private repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    this.hasErrorSubject$.next(false);
    return this.trainingInstanceFacade.getAssociatedTrainingRunsPaginated(this.trainingInstance.id, this.lastPagination)
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
