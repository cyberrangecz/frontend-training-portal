import {RequestStage} from '../sandbox/pool/request/stage/request-stage';
import {StageDetailEventType} from '../enums/stage-detail-event-type';

export class StageDetailEvent {
  stage: RequestStage;
  type: StageDetailEventType;

  constructor(stage: RequestStage, type: StageDetailEventType) {
    this.stage = stage;
    this.type = type;
  }
}

