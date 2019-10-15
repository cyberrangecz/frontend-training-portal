import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PoolRequestService} from './pool-request.service';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';
import {environment} from '../../../environments/environment';

@Injectable()
export class PoolCreationRequestsConcreteService extends PoolRequestService {

  private creationRequestsSubject: BehaviorSubject<PaginatedResource<PoolRequest[]>> = new BehaviorSubject(this.initSubject());
  requests$: Observable<PaginatedResource<PoolRequest[]>> = this.creationRequestsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    this.hasErrorSubject.next(false);
    return this.sandboxInstanceFacade.getCreationRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => {
            this.creationRequestsSubject.next(paginatedRequests);
            this.totalLengthSubject.next(paginatedRequests.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching creation requests');
            this.hasErrorSubject.next(true);
          }
        )
      );
  }

  cancel(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.cancelCreationRequest(poolId, request.id)
      .pipe(
        tap(
          { error: err => this.errorHandler.display(err, 'Canceling creation request')}
        )
      );  }

  retry(poolId: number, request: PoolRequest): Observable<any> {
    return this.sandboxInstanceFacade.retryCreationRequest(poolId, request.id)
      .pipe(
        tap(
          { error: err => this.errorHandler.display(err, 'Canceling creation request')}
        )
      );
  }

  private initSubject(): PaginatedResource<PoolRequest[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
