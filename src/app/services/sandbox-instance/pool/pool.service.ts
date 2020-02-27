import {Observable} from 'rxjs';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated pools and other operations to modify data.
 */
export abstract class PoolService extends PaginatedResourceService<SandboxPool> {

  /**
   * @param pagination requested pagination
   */
  abstract getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool>>;

  /**
   * Deletes a pool
   * @param pool a pool to delete
   */
  abstract delete(pool: SandboxPool): Observable<any>;

  /**
   * Allocates sandbox instances to a pool
   * @param pool a pool to be allocated
   * @param count number of sandbox instance to be allocated
   */
  abstract allocate(pool: SandboxPool, count?: number): Observable<any>;

  /**
   * Clears a pool by deleting all sandbox instances
   * @param pool a pool to be cleared
   */
  abstract clear(pool: SandboxPool): Observable<any>;

}
