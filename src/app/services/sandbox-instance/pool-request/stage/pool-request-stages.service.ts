import {Observable} from 'rxjs';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';
import {PaginatedResourceService} from '../../../shared/paginated-resource.service';

export abstract class PoolRequestStagesService extends PaginatedResourceService {
  abstract stages$: Observable<RequestStage[]>;

  abstract getAll(poolId: number, requestId: number): Observable<RequestStage[]>;

  abstract force(poolId: number, requestId: number, stageId: number): Observable<any>;
}
