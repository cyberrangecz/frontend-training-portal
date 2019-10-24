import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../../model/table-adapters/paginated-resource';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

export abstract class PoolRequestService extends PaginatedResourceService {
  abstract requests$: Observable<PaginatedResource<PoolRequest[]>>;

  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>>;

  abstract cancel(poolId: number, request: PoolRequest): Observable<any>;

  abstract retry(poolId: number, request: PoolRequest): Observable<any>;
}
