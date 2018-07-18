import {TrainingRunStateEnum} from "../../enums/training-run-state.enum";

export class TrainingRun {

  id: number;
  trainingInstanceId: number;
  sandboxInstanceId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  currentLevel: number;
  eventLogReference: string;
  state: TrainingRunStateEnum;


  constructor(trainingInstanceId: number, sandboxInstanceId: number, userId: number, startTime: Date, endTime: Date, currentLevel: number, eventLogReference: string, state: TrainingRunStateEnum) {
    this.trainingInstanceId = trainingInstanceId;
    this.sandboxInstanceId = sandboxInstanceId;
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentLevel = currentLevel;
    this.eventLogReference = eventLogReference;
    this.state = state;
  }
}
