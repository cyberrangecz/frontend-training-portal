import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';
import {PoolRequest} from '../../../../model/sandbox/pool/request/pool-request';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxInstanceApi} from '../../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../../shared/error-handler.service';
import {RequestedPagination} from '../../../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../../../environments/environment';
import {PoolRequestPollingService} from '../pool-request-polling.service';
import {HttpErrorResponse} from '@angular/common/http';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get cleanup requests, poll them and perform various operations to modify them.
 */
@Injectable()
export class PoolCleanupRequestsPollingService extends PoolRequestPollingService {

  /**
   * List of cleanup requests with currently selected pagination options
   */
  resource$: Observable<PaginatedResource<PoolRequest>>;

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private errorHandler: ErrorHandlerService) {
    super();
    this.resource$ = merge(this.poll$, this.resourceSubject$.asObservable());
  }

  /**
   * Gets all cleanup requests with passed pagination and updates related observables or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param pagination requested pagination
   */
  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest>> {
    this.onManualGetAll(poolId, pagination);
    return this.sandboxInstanceFacade.getCleanupRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.resourceSubject$.next(paginatedRequests),
          err => this.onGetAllError(err)
        )
      );
  }

  /**
   * Cancels a cleanup request, informs about the result and updates list of requests or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param request a request to be cancelled
   */
  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCleanupRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.emit(err, 'Cancelling cleanup request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  /**
   * Retries a cleanup request, informs about the result and updates list of requests or handles an error
   * @param poolId id of a pool associated with cleanup requests
   * @param request a request to be retried
   */
  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCleanupRequest(poolId, request.id)
      .pipe(
        tap({ error: err => this.errorHandler.emit(err, 'Retrying cleanup request')}),
        switchMap(_ => this.getAll(poolId, this.lastPagination))
      );
  }

  /**
   * Repeats last get all request for polling purposes
   */
  protected repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getCleanupRequests(this.lastPoolId, this.lastPagination)
      .pipe(
        tap({ error: err => this.onGetAllError(err)})
      );
  }

  private onGetAllError(err: HttpErrorResponse) {
    this.errorHandler.emit(err, 'Fetching deletion requests');
    this.hasErrorSubject$.next(true);
  }
}
