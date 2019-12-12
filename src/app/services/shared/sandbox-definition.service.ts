import {Observable} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {SandboxDefinitionInfo} from '../../components/sandbox-definition/create-sandbox-definition/sandbox-definition-info';
import {PaginatedResourceService} from './paginated-resource.service';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

export abstract class SandboxDefinitionService extends PaginatedResourceService {

  abstract sandboxDefinitions$: Observable<PaginatedResource<SandboxDefinition[]>>;

  /**
   * Returns all sandbox definitions which are available
   * @param pagination consists of page size and page number. This param can be omitted in first call.
   */
  abstract getAll(pagination?: RequestedPagination): Observable<PaginatedResource<SandboxDefinition[]>>;

  /**
   * Deletes sandbox definition by given id
   * @param id unique identifier of sandbox
   */
  abstract delete(id: number): Observable<PaginatedResource<SandboxDefinition[]>>;

  /**
   * Adds new sandbox definition to existing ones
   * @param result consists of URL to Gitlab and revision
   */
  abstract create(result: SandboxDefinitionInfo): Observable<any>;
}
