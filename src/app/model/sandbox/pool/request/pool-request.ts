import {RequestStage} from './stage/request-stage';

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

}
