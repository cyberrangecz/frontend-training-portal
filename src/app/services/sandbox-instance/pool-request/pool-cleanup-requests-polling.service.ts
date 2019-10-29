import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {PaginatedResource} from '../../../model/table-adapters/paginated-resource';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../environments/environment';
import {PoolRequestPollingService} from './pool-request-polling.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Cacheable, CacheBuster} from 'ngx-cacheable';

export const poolCleanupRequestsCacheBuster$: Subject<void> = new Subject();

@Injectable()
export class PoolCleanupRequestsPollingService extends PoolRequestPollingService {

  private manuallyUpdatedRequests$: BehaviorSubject<PaginatedResource<PoolRequest[]>> = new BehaviorSubject(this.initSubject());
  requests$: Observable<PaginatedResource<PoolRequest[]>>;

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
    this.requests$ = merge(this.poll$, this.manuallyUpdatedRequests$.asObservable())
      .pipe(
        tap(paginatedRequests => this.totalLengthSubject.next(paginatedRequests.pagination.totalElements))
      );
  }

  @Cacheable({
    cacheBusterObserver: poolCleanupRequestsCacheBuster$
  })
  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    this.onManualGetAll(poolId, pagination);
    return this.sandboxInstanceFacade.getCleanupRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.manuallyUpdatedRequests$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  @CacheBuster({
    cacheBusterNotifier: poolCleanupRequestsCacheBuster$
  })
  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCleanupRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Canceling cleanup request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  @CacheBuster({
    cacheBusterNotifier: poolCleanupRequestsCacheBuster$
  })
  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCleanupRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Retrying cleanup request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  @Cacheable({
    cacheBusterObserver: poolCleanupRequestsCacheBuster$,
    maxAge: environment.apiPollingPeriod - 1
  })
  protected repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest[]>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getCleanupRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.display(err, 'Fetching deletion requests');
    this.hasErrorSubject$.next(true);
  }

  private initSubject(): PaginatedResource<PoolRequest[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
