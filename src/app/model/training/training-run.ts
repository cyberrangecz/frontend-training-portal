import {User} from "../user/user";
import {AbstractLevel} from "../level/abstract-level";
import {TrainingRunStateEnum} from "../../enums/training-run-state-enum";

export class TrainingRun {

  id: number;
  trainingInstance: number;
  sandboxInstance: number;
  user: User;
  startTime: Date;
  endTime: Date;
  currentLevel: AbstractLevel;
  eventLogReference: string;
  state: TrainingRunStateEnum;


  constructor(id: number, trainingInstance: number, sandboxInstance: number, user: User, startTime: Date, endTime: Date, currentLevel: AbstractLevel, eventLogReference: string, state: TrainingRunStateEnum) {
    this.id = id;
    this.trainingInstance = trainingInstance;
    this.sandboxInstance = sandboxInstance;
    this.user = user;
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentLevel = currentLevel;
    this.eventLogReference = eventLogReference;
    this.state = state;
  }
}
