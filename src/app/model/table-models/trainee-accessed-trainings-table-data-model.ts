import {TraineeAccessTrainingRunActionEnum} from "../../enums/trainee-access-training-run-actions.enum";

export class TraineeAccessedTrainingsTableDataModel {
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;
}
