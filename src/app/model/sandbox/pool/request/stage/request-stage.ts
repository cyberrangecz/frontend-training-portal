import {RequestStageState} from '../../../../enums/request-stage-state.enum';

export abstract class RequestStage {
  id: number;
  jobId: number;
  externalResource: string;
  description: string;
  state: RequestStageState;
  percentFinished: number;
  output?: string[];
}
