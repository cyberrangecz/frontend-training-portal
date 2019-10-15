import {RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {PaginatedResourceService} from '../shared/paginated-resource.service';

export abstract class SandboxInstanceService extends PaginatedResourceService {
  abstract instances$: Observable<PaginatedResource<SandboxInstance[]>>;
  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>>;
  abstract delete(sandboxInstance: SandboxInstance): Observable<any>;
}
