import {Observable} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {SandboxDefinitionCreateInfo} from '../../model/sandbox/definition/sandbox-definition-create-info';
import {PaginatedResourceService} from '../shared/paginated-resource.service';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated sandbox definitions and other operations to modify data.
 * Subscribe to definitions$ to receive latest data updates.
 */
export abstract class SandboxDefinitionService extends PaginatedResourceService {

  /**
   * @contract must be updated every time new data are received
   */
  abstract definitions$: Observable<PaginatedResource<SandboxDefinition>>;

  /**
   * @param pagination requested pagination
   */
  abstract getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinition>>;

  /**
   * Deletes sandbox definition by given id
   * @param id unique identifier of a sandbox definition
   */
  abstract delete(id: number): Observable<PaginatedResource<SandboxDefinition>>;

  /**
   * Creates a  new sandbox definition
   * @param sandboxDefinitionInfo container for attributes required for sandbox definition creation
   */
  abstract create(sandboxDefinitionInfo: SandboxDefinitionCreateInfo): Observable<any>;
}
