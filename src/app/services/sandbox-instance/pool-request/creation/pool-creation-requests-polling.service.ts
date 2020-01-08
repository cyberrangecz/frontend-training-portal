import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  merge,
  Observable, Subject,
} from 'rxjs';
import {
  switchMap,
  tap
} from 'rxjs/operators';
import {PoolRequest} from '../../../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {RequestedPagination} from '../../../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {PoolRequestPollingService} from '../pool-request-polling.service';
import {Cacheable, CacheBuster} from 'ngx-cacheable';

/**
 * Emission causes cached data to cleanup
 */
export const poolCreationRequestsCacheBuster$: Subject<void> = new Subject();

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get creation requests, poll them and perform various operations to modify them.
 */
@Injectable()
export class PoolCreationRequestsPollingService extends PoolRequestPollingService {

  private manuallyUpdatedRequests$: BehaviorSubject<PaginatedResource<PoolRequest[]>> = new BehaviorSubject(this.initSubject());

  /**
   * List of creation requests with currently selected pagination options
   */
  requests$: Observable<PaginatedResource<PoolRequest[]>>;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
    this.requests$ = merge(this.poll$, this.manuallyUpdatedRequests$.asObservable())
      .pipe(
        tap(paginatedRequests => this.totalLengthSubject$.next(paginatedRequests.pagination.totalElements))
      );
  }

  /**
   * Gets all creation requests with passed pagination and updates related observables or handles an error
   * @param poolId id of a pool associated with creation requests
   * @param pagination requested pagination
   */
  @Cacheable({
    cacheBusterObserver: poolCreationRequestsCacheBuster$
  })
  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    this.onManualGetAll(poolId, pagination);
    return this.sandboxInstanceFacade.getCreationRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.manuallyUpdatedRequests$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Cancels a creation request, informs about the result and updates list of requests or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param request a request to be cancelled
   */
  @CacheBuster({
    cacheBusterNotifier: poolCreationRequestsCacheBuster$
  })
  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCreationRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Cancelling creation request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  /**
   * Retries a creation request, informs about the result and updates list of requests or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param request a request to be retried
   */
  @CacheBuster({
    cacheBusterNotifier: poolCreationRequestsCacheBuster$
  })
  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCreationRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Cancelling creation request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  /**
   * Repeats last get all request for polling purposes
   */
  @Cacheable({
    cacheBusterObserver: poolCreationRequestsCacheBuster$,
    maxAge: environment.apiPollingPeriod - 1
  })
  protected repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest[]>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getCreationRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching creation requests');
    this.hasErrorSubject$.next(true);
  }

  private initSubject(): PaginatedResource<PoolRequest[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
