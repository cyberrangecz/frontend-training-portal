import {User} from "../user/user";
import {number} from "../level/abstract-level";
import {TrainingRunStateEnum} from "../../enums/training-run-state-enum";

export class TrainingRun {

  id: number;
  trainingInstance: number;
  sandboxInstance: number;
  user: User;
  startTime: Date;
  endTime: Date;
  currentLevel: number;
  eventLogReference: string;
  state: TrainingRunStateEnum;


  constructor(id: number, trainingInstance: number, sandboxInstance: number, user: User, startTime: Date, endTime: Date, currentLevel: number, eventLogReference: string, state: TrainingRunStateEnum) {
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
