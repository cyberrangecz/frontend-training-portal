import {RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated sandbox instances and other operations to modify data.
 * Subscribe to instances$ to receive latest data updates.
 */
export abstract class SandboxInstanceService extends PaginatedResourceService {

  /**
   * @contract must be updated every time new data are received
   */
  abstract instances$: Observable<PaginatedResource<SandboxInstance[]>>;

  /**
   * @param poolId id of a pool associated with sandbox instances
   * @param pagination requested pagination
   */
  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>>;

  /**
   * Deletes a sandbox instance
   * @param sandboxInstance a sandbox instance to be deleted
   */
  abstract delete(sandboxInstance: SandboxInstance): Observable<any>;

  /**
   * Starts allocation of a sandbox instance in a provided pool
   * @param poolId id of a pool in which the allocation will take place
   */
  abstract allocate(poolId: number): Observable<any>;

  /**
   * Unlocks a sandbox instance making it available for modification
   * @param sandboxInstance a sandbox instance to be unlocked
   */
  abstract unlock(sandboxInstance: SandboxInstance): Observable<any>;

  /**
   * Lock a sandbox instance making it unavailable for modification and save for usage
   * @param sandboxInstance a sandbox instance to be locked
   */
  abstract lock(sandboxInstance: SandboxInstance): Observable<any>;
}
