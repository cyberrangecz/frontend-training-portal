import {TraineeAccessTrainingRunActionEnum} from '../enums/trainee-access-training-run-actions.enum';
import {TableRowAdapter} from './table-row-adapter';

export class AccessedTrainingRun implements TableRowAdapter {
  totalLevels: number;
  currentLevel: number;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceDuration: string;
  trainingInstanceFormatedDuration: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;

  constructor() {}
}
