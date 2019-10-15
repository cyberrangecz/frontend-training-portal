import {PoolRequestService} from './pool-request.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {tap} from 'rxjs/operators';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../environments/environment';

@Injectable()
export class PoolCleanupRequestsConcreteService extends PoolRequestService {

  private cleanupRequestsSubject: BehaviorSubject<PaginatedResource<PoolRequest[]>> = new BehaviorSubject(this.initSubject());
  requests$: Observable<PaginatedResource<PoolRequest[]>> = this.cleanupRequestsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    this.hasErrorSubject.next(false);
    return this.sandboxInstanceFacade.getCleanupRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => {
            this.cleanupRequestsSubject.next(paginatedRequests);
            this.totalLengthSubject.next(paginatedRequests.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching cleanup requests');
            this.hasErrorSubject.next(true);
          }
        )
      );
  }

  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCleanupRequest(poolId, request.id)
      .pipe(
        tap(
          { error: err => this.errorHandler.display(err, 'Canceling cleanup request')}
        )
      );
  }

  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCleanupRequest(poolId, request.id)
      .pipe(
        tap(
          { error: err => this.errorHandler.display(err, 'Retrying cleanup request')}
        )
      );
  }

  private initSubject(): PaginatedResource<PoolRequest[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
