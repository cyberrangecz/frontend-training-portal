import {RequestStage} from './stage/request-stage';
import {RequestStageState} from '../../../enums/request-stage-state.enum';

export abstract class PoolRequest {
  id: number;
  stagesCount: number;

  private _stages: RequestStage[];

  get stages(): RequestStage[] {
    return this._stages;
  }

  set stages(value: RequestStage[]) {
    this._stages = value;
    this.stagesCount = value.length;
  }

  isFailed(): boolean {
    return this.stages.some(stage => stage.state === RequestStageState.FAILED);
  }

  isRunning(): boolean {
    return  this.stages.some(stage => stage.state === RequestStageState.RUNNING || stage.state === RequestStageState.IN_QUEUE);
  }
}
