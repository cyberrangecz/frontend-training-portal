import {RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

export abstract class SandboxInstanceService extends PaginatedResourceService {
  abstract instances$: Observable<PaginatedResource<SandboxInstance[]>>;

  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>>;

  abstract delete(sandboxInstance: SandboxInstance): Observable<any>;

  abstract allocate(id: number): Observable<any>;

  abstract unlock(sandboxInstance: SandboxInstance): Observable<any>;

  abstract lock(sandboxInstance: SandboxInstance): Observable<any>;
}
