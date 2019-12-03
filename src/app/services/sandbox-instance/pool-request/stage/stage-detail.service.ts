import {Observable} from 'rxjs';
import {StageDetail} from '../../../../model/sandbox/pool/request/stage/stage-detail';
import {RequestStage} from '../../../../model/sandbox/pool/request/stage/request-stage';

export abstract class StageDetailService {
  abstract stageDetail$: Observable<StageDetail[]>;
  abstract subscribe(stage: RequestStage): Observable<any>;
  abstract unsubscribe(stage: RequestStage);
}
