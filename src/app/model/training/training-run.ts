import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";
import {AbstractLevel} from "../level/abstract-level";
import {TrainingInstance} from "./training-instance";

/**
 * Class representing training run of an instance
 */
export class TrainingRun {

  id: number;
  trainingInstance: TrainingInstance;
  sandboxInstanceId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  currentLevel: AbstractLevel | number;
  eventLogReference: string;
  state: TrainingRunStateEnum;

  constructor() {
  }
}
