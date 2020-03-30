import {Observable} from 'rxjs';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPaginatedResourceService} from 'kypo-common';
import {SandboxDefinition} from 'kypo-sandbox-model';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated sandbox definitions and other operations to modify data.
 */
export abstract class SandboxDefinitionOverviewService extends KypoPaginatedResourceService<SandboxDefinition> {
  /**
   * @param pagination requested pagination
   */
  abstract getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxDefinition>>;

  /**
   * Deletes sandbox definition by given id
   * @param sandboxDefinition sandbox definition to delete
   */
  abstract delete(sandboxDefinition: SandboxDefinition): Observable<KypoPaginatedResource<SandboxDefinition>>;

  /**
   * Creates a  new sandbox definition
   */
  abstract create(): Observable<any>;
}
