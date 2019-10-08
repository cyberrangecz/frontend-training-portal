import {Observable} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';

export abstract class SandboxInstanceService {
  abstract instances$: Observable<Kypo2Table<SandboxInstance>>;
  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>>;
}
