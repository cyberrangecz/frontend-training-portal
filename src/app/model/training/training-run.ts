import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {TrainingInstance} from "./training-instance";
import {User} from '../user/user';

/**
 * Class representing training run of an instance
 */
export class TrainingRun {

  id: number;
  trainingInstance: TrainingInstance;
  sandboxInstanceId: number;
  user: User;
  startTime: Date;
  endTime: Date;
  currentLevel: AbstractLevel | number;
  eventLogReference: string;
  state: TrainingRunStateEnum;

  constructor() {
  }
}
