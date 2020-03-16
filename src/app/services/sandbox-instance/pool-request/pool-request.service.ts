import {Observable} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {KypoPaginatedResource} from 'kypo-common';
import {KypoPaginatedResourceService} from 'kypo-common';
import {KypoRequestedPagination} from 'kypo-common';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated requests and other operations to modify data.
 */
export abstract class PoolRequestService extends KypoPaginatedResourceService<PoolRequest> {

  /**
   * @param poolId id of a pool associated with requests
   * @param pagination requested pagination
   */
  abstract getAll(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<PoolRequest>>;

  /**
   * Cancels a request
   * @param poolId id of a pool associated with requests
   * @param request a request to be canceled
   */
  abstract cancel(poolId: number, request: PoolRequest): Observable<any>;

  /**
   * Retries a request
   * @param poolId id of a pool associated with requests
   * @param request a request to be retried
   */
  abstract retry(poolId: number, request: PoolRequest): Observable<any>;
}
