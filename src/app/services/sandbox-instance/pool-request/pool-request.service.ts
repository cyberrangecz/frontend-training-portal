import { RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get paginated requests and other operations to modify data.
 * Subscribe to requests$ to receive latest data updates.
 */
export abstract class PoolRequestService extends PaginatedResourceService {

  /**
   * @contract must be updated every time new data are received
   */
  abstract requests$: Observable<PaginatedResource<PoolRequest[]>>;

  /**
   * @param poolId id of a pool associated with requests
   * @param pagination requested pagination
   */
  abstract getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>>;

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
