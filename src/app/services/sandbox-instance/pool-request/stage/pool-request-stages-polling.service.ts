import {merge, Observable, Subject, timer} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {map, retryWhen, switchMap, tap} from 'rxjs/operators';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {PoolRequestStagesService} from './pool-request-stages.service';
import {SandboxInstanceFacade} from '../../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {RequestedPagination} from 'kypo2-table';
import {OpenStackStage} from '../../../../model/sandbox/pool/request/stage/open-stack-stage';
import {AnsibleRunStage} from '../../../../model/sandbox/pool/request/stage/ansible-run-stage';

export const poolRequestStagesCacheBuster$: Subject<void> = new Subject();

@Injectable()
export class PoolRequestStagesPollingService extends PoolRequestStagesService {
  private poolId: number;
  private requestId: number;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdatedStages$: Subject<RequestStage[]> = new Subject();
  private type: 'CREATION' | 'CLEANUP' = 'CREATION';

  hasError$: Observable<boolean> = this.hasErrorSubject$.asObservable();
  stages$: Observable<RequestStage[]>;

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  startPolling(poolId: number, requestId: number, type: 'CREATION' | 'CLEANUP') {
    this.poolId = poolId;
    this.type = type;
    this.requestId = requestId;
    const poll$ = this.createPoll();
    this.stages$ = merge(poll$, this.manuallyUpdatedStages$.asObservable());
  }

  @Cacheable({
    cacheBusterObserver: poolRequestStagesCacheBuster$
  })
  getAll(poolId: number, requestId: number): Observable<RequestStage[]> {
    this.onManualGetAll(poolId, requestId);
    const mockPagination = new RequestedPagination(0, 100, '', '');
/*    const stagesRequest$ = this.type === 'CREATION'
      ? this.sandboxInstanceFacade.getCreationStages(poolId, requestId, mockPagination)
      : this.sandboxInstanceFacade.getCleanupStages(poolId, requestId, mockPagination);*/
    const stagesRequest$ = this.sandboxInstanceFacade.getCreationStages(poolId, requestId, mockPagination);
    return stagesRequest$
      .pipe(
        map(paginatedResource => paginatedResource.elements),
        tap(
          stages => this.manuallyUpdatedStages$.next(stages),
          err => this.onGetAllError(err)
        )
      );
  }

  @CacheBuster({
    cacheBusterNotifier: poolRequestStagesCacheBuster$
  })
  force(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.sandboxInstanceFacade.forceStage(poolId, requestId, stageId)
      .pipe(
        tap( { error: err => this.errorHandler.display(err, 'Forcing stage')}),
        switchMap(_ => this.getAll(poolId, requestId))
      );
  }

  getOutput(stage: RequestStage): Observable<string[]> {
    let stageOutput$: Observable<string[]>;
    if (stage instanceof OpenStackStage) {
      stageOutput$ = this.sandboxInstanceFacade.getOpenstackStageOutput(stage.id);
    }
    if (stage instanceof AnsibleRunStage) {
      stageOutput$ = this.sandboxInstanceFacade.getAnsibleStageOutput(stage.id);
    }
    return stageOutput$
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Fetching stage output')})
      );
  }

  @Cacheable({
    cacheBusterObserver: poolRequestStagesCacheBuster$,
    maxAge: environment.apiPollingPeriod - 1
  })
  private repeatLastGetAllRequest(): Observable<RequestStage[]> {
    this.hasErrorSubject$.next(false);
    const mockPagination = new RequestedPagination(0, 100, '', '');
    /*    const stagesRequest$ = this.type === 'CREATION'
          ? this.sandboxInstanceFacade.getCreationStages(poolId, requestId, mockPagination)
          : this.sandboxInstanceFacade.getCleanupStages(poolId, requestId, mockPagination);*/
    const stagesRequest$ = this.sandboxInstanceFacade.getCreationStages(this.poolId, this.requestId, mockPagination);
    return stagesRequest$
      .pipe(
        map(paginatedResource => paginatedResource.elements),
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private createPoll(): Observable<RequestStage[]> {
    return timer(0, environment.apiPollingPeriod)
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
