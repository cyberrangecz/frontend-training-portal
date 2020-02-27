import {Observable} from 'rxjs';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {PaginatedResourceService} from '../../../shared/paginated-resource.service';
import {PaginatedResource} from '../../../../model/table/other/paginated-resource';

/**
 * A layer between a component and an API service. Implement a concrete service by extending this class.
 * Provide a concrete class in Angular Module. For more info see https://angular.io/guide/dependency-injection-providers.
 * You can use get methods to get stages and other operations to modify data.
 */
export abstract class PoolRequestStagesService extends PaginatedResourceService<RequestStage> {

  /**
   * @param poolId id of a pool associated with stages
   * @param requestId id of a request associated with stages
   */
  abstract getAll(poolId: number, requestId: number): Observable<PaginatedResource<RequestStage>>;

  /**
   * Forces stage to be performed again and finish
   * @param poolId id of a pool associated with stages
   * @param requestId id of a request associated with stages
   * @param stageId if of a stage to be forced
   */
  abstract force(poolId: number, requestId: number, stageId: number): Observable<any>;
}
