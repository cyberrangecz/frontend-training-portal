import {RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {PaginatedResourceService} from '../shared/paginated-resource.service';

export abstract class PoolService extends PaginatedResourceService {
  abstract pools$: Observable<PaginatedResource<SandboxPool[]>>;

  abstract getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>>;

  abstract delete(pool: SandboxPool): Observable<any>;

  abstract allocate(pool: SandboxPool, count?: number): Observable<any>;

  abstract clear(pool: SandboxPool): Observable<any>;

}
