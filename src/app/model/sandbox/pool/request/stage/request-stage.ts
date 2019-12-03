import {RequestStageState} from '../../../../enums/request-stage-state.enum';
import {RequestStageType} from '../../../../enums/request-stage-type.enum';

export abstract class RequestStage {
  id: number;
  description: string;
  state: RequestStageState;
  errorMessage: string;
  start: Date;
  end: Date;
  type: RequestStageType = RequestStageType.ANSIBLE_RUN // TODO: remove assignment
}
