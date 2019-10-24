import {Observable} from 'rxjs';
import {RequestStage} from '../../../model/sandbox/pool/request/stage/request-stage';

export abstract class PoolRequestStagesService {
  abstract stages$: Observable<RequestStage[]>;
  abstract getAll(poolId: number, requestId: number): Observable<RequestStage[]>;
  abstract force(poolId: number, requestId: number, stageId: number): Observable<any>;
}
