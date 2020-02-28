import {Observable} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {PaginatedResourceService} from '../shared/paginated-resource.service';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated sandbox definitions and other operations to modify data.
 */
export abstract class SandboxDefinitionOverviewService extends PaginatedResourceService<SandboxDefinition> {
  /**
   * @param pagination requested pagination
   */
  abstract getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinition>>;

  /**
   * Deletes sandbox definition by given id
   * @param sandboxDefinition sandbox definition to delete
   */
  abstract delete(sandboxDefinition: SandboxDefinition): Observable<PaginatedResource<SandboxDefinition>>;

  /**
   * Creates a  new sandbox definition
   */
  abstract create(): Observable<any>;
}
