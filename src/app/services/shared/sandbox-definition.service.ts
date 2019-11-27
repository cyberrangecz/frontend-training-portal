import {Observable} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxDefinitionInfo} from '../../components/sandbox-definition/add-sandbox-definition-dialog/sandbox-definition-info';
import {PaginatedResourceService} from './paginated-resource.service';

export abstract class SandboxDefinitionService extends PaginatedResourceService {

  abstract sandboxDefinitions$: Observable<PaginatedResource<SandboxDefinitionTableRow[]>>;

  /**
   * Returns all sandbox definitions which are available
   * @param pagination consists of page size and page number. This param can be omitted in first call.
   */
  abstract getAll(pagination?: RequestedPagination): Observable<PaginatedResource<SandboxDefinitionTableRow[]>>;

  /**
   * Deletes sandbox definition by given id
   * @param id unique identifier of sandbox
   */
  abstract delete(id: number): Observable<PaginatedResource<SandboxDefinitionTableRow[]>>;

  /**
   * Adds new sandbox definition to existing ones
   * @param result consists of URL to Gitlab and revision
   */
  abstract add(result: SandboxDefinitionInfo): Observable<any>;
}
