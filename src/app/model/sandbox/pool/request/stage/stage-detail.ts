import {RequestStageType} from '../../../../enums/request-stage-type.enum';

/**
 * Class representing request stage detail
 */
export class StageDetail {
  stageId: number;
  type: RequestStageType;
  output: string[];
  hasError: boolean;
}
