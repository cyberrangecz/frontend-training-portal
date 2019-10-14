import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';

export abstract class PoolRequestsService {
  abstract creationRequests$: Observable<Kypo2Table<PoolRequest>>;
  abstract cleanupRequests$: Observable<Kypo2Table<PoolRequest>>;
  abstract getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>>;
  abstract getCleanupRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>>;

}
