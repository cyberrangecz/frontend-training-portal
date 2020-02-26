import {merge, Observable, Subject, timer} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {map, retryWhen, switchMap, tap} from 'rxjs/operators';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {PoolRequestStagesService} from './pool-request-stages.service';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestedPagination} from '../../../../model/DTOs/other/requested-pagination';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get stages of creation or cleanup requests, poll them and perform various operations to modify them.
 */
@Injectable()
export class PoolRequestStagesPollingService extends PoolRequestStagesService {
  private poolId: number;
  private requestId: number;
  private retryPolling$: Subject<boolean> = new Subject();
  private manuallyUpdatedStages$: Subject<RequestStage[]> = new Subject();
  private type: 'CREATION' | 'CLEANUP' = 'CREATION';

  /**
   * List of stages
   */
  stages$: Observable<RequestStage[]>;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Starts polling with ids and info passed as arguments
   * @param poolId id of a pool associated with stages
   * @param requestId id of a request associated with stages
   * @param type type of a request. CREATION or CLEANUP
   */
  startPolling(poolId: number, requestId: number, type: 'CREATION' | 'CLEANUP') {
    this.poolId = poolId;
    this.type = type;
    this.requestId = requestId;
    const poll$ = this.createPoll();
    this.stages$ = merge(poll$, this.manuallyUpdatedStages$.asObservable());
  }

  /**
   * Gets all stages and updates related observables or handles an error
   * @param poolId id of a pool associated with stages
   * @param requestId id of a request associated with stages
   */
  getAll(poolId: number, requestId: number): Observable<RequestStage[]> {
    this.onManualGetAll(poolId, requestId);
    const fakePagination = new RequestedPagination(0, 100, '', '');
    // TODO: Add once supported by a backend API
/*    const stagesRequest$ = this.type === 'CREATION'
      ? this.sandboxInstanceFacade.getCreationStages(poolId, requestId, mockPagination)
      : this.sandboxInstanceFacade.getCleanupStages(poolId, requestId, mockPagination);*/
    const stagesRequest$ = this.sandboxInstanceFacade.getCreationStages(poolId, requestId, fakePagination);
    return stagesRequest$
      .pipe(
        map(paginatedResource => paginatedResource.elements),
        tap(
          stages => this.manuallyUpdatedStages$.next(stages),
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Forces stage to finish, informs on result of the operation and refreshes list of stages or handles error
   * @param poolId id of a pool associated with stages
   * @param requestId id of a request associated with stages
   * @param stageId if of a stage to be forced
   */
  force(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.sandboxInstanceFacade.forceStage(poolId, requestId, stageId)
      .pipe(
        tap( { error: err => this.errorHandler.emit(err, 'Forcing stage')}),
        switchMap(_ => this.getAll(poolId, requestId))
      );
  }

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
    this.errorHandler.emit(err, 'Fetching stages');
    this.hasErrorSubject$.next(true);
  }
}
