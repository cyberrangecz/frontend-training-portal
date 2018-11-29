import {TraineeAccessTrainingRunActionEnum} from "../../enums/trainee-access-training-run-actions.enum";
import {ITableDataModel} from "./itable-data-model";

export class TraineeAccessedTrainingsTableDataModel implements ITableDataModel{
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;
}
