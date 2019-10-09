import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';

export abstract class SandboxInstanceService {
  abstract instances$: Observable<Kypo2Table<SandboxInstance>>;
  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>>;
}
