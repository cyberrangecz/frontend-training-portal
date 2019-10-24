import {BehaviorSubject, merge, Observable, Subject, timer} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {map, retryWhen, switchMap, tap} from 'rxjs/operators';
import {RequestStage} from '../../../model/sandbox/pool/request/stage/request-stage';
import {PoolRequestStagesService} from './pool-request-stages.service';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {AlertService} from '../../shared/alert.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class PoolRequestStagesPollingService extends PoolRequestStagesService {
  private poolId: number;
  private requestId: number;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdatedStages$: Subject<RequestStage[]> = new Subject();
  private hasErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();
  stages$: Observable<RequestStage[]>;

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  startPolling(poolId: number, requestId: number) {
    this.poolId = poolId;
    this.requestId = requestId;
    const poll$ = this.createPoll();
    this.stages$ = merge(poll$, this.manuallyUpdatedStages$.asObservable());
  }

  force(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.sandboxInstanceFacade.forceStage(poolId, requestId, stageId)
      .pipe(
        tap( { error: err => this.errorHandler.display(err, 'Forcing stage')}),
        switchMap(_ => this.getAll(poolId, requestId))
      );
  }

  getAll(poolId: number, requestId: number): Observable<RequestStage[]> {
    this.onManualGetAll(poolId, requestId);
    return this.sandboxInstanceFacade.getRequest(poolId, requestId)
      .pipe(
        map(request => request.stages),
        tap(
          stages => this.manuallyUpdatedStages$.next(stages),
          err => this.onGetAllError(err)
        )
      );
  }

  private repeatLastGetAllRequest(): Observable<RequestStage[]> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getRequest(this.poolId, this.requestId)
      .pipe(
        map(request => request.stages),
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private createPoll(): Observable<RequestStage[]> {
    return timer(environment.apiPollingPeriod, environment.apiPollingPeriod)
      .pipe(
        switchMap(_ => this.repeatLastGetAllRequest()),
        retryWhen(_ => this.retryPolling$),
      );
  }

  private onManualGetAll(poolId: number, requestId: number) {
    this.poolId = poolId;
    this.requestId = requestId;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching stages');
    this.hasErrorSubject$.next(true);
  }
}
