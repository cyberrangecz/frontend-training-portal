import {TraineeAccessTrainingRunActionEnum} from "../enums/trainee-access-training-run-actions.enum";
import {TableAdapter} from "./table-adapter";

export class AccessedTrainingRunsTableAdapter implements TableAdapter {
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;
}
