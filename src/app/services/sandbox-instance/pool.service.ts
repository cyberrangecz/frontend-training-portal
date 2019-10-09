import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';

export abstract class PoolService {
  abstract pools$: Observable<Kypo2Table<SandboxPool>>;
  abstract getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>>;
}
