import {TraineeAccessTrainingRunActionEnum} from "../enums/trainee-access-training-run-actions.enum";
import {TableRowAdapter} from "./table-row-adapter";

export class AccessedTrainingRunsTableRow implements TableRowAdapter {
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;
}
