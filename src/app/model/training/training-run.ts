import {TrainingRunStateEnum} from "../enums/training-run-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {TrainingInstance} from "./training-instance";
import {User} from '../user/user';
import {SandboxInstanceState} from "../enums/sandbox-instance-state";

/**
 * Class representing training run of an instance
 */
export class TrainingRun {

  id: number;
  sandboxInstanceId: number;
  trainingInstanceId: number;
  trainingDefinitionId: number;
  player: User;
  startTime: Date;
  endTime: Date;
  currentLevel: AbstractLevel | number;
  eventLogReference: string;
  state: TrainingRunStateEnum;
  sandboxInstanceState: SandboxInstanceState;
  constructor() {
  }
}
