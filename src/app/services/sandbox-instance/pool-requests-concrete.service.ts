import {PoolRequestsService} from './pool-requests.service';
import {Injectable} from '@angular/core';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable, Subject} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {tap} from 'rxjs/operators';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PoolRequestTableCreator} from '../../model/table-adapters/pool-request-table-creator';

@Injectable()
export class PoolRequestsConcreteService extends  PoolRequestsService {

  private creationRequestsSubject: Subject<Kypo2Table<PoolRequest>> = new Subject();
  creationRequests$: Observable<Kypo2Table<PoolRequest>> = this.creationRequestsSubject.asObservable();

  private deletionRequestsSubject: Subject<Kypo2Table<PoolRequest>> = new Subject();
  deletionRequests$: Observable<Kypo2Table<PoolRequest>> = this.deletionRequestsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.sandboxInstanceFacade.getCreationRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.creationRequestsSubject.next(PoolRequestTableCreator.create(paginatedRequests, poolId)),
          err => this.errorHandler.display(err, 'Fetching creation requests')
        )
      );
  }

  getDeletionRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.sandboxInstanceFacade.getDeletionRequests(poolId, pagination)
      .pipe(
        tap(
          paginatedRequests => this.deletionRequestsSubject.next(PoolRequestTableCreator.create(paginatedRequests, poolId)),
          err => this.errorHandler.display(err, 'Fetching deletion requests')
        )
      );  }
}
