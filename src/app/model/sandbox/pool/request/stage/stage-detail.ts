import {RequestStageType} from '../../../../enums/request-stage-type.enum';

export class StageDetail {
  stageId: number;
  type: RequestStageType;
  output: string[];
  hasError: boolean;
}
