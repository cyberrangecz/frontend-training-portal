import {TraineeAccessTrainingRunActionEnum} from '../../enums/trainee-access-training-run-actions.enum';

/**
 * Class representing row of accessed training run table
 */
export class AccessedTrainingRun {
  totalLevels: number;
  currentLevel: number;
  completedLevels: string;
  trainingRunId: number;
  action: TraineeAccessTrainingRunActionEnum;
  trainingInstanceTitle: string;
  trainingInstanceFormattedDuration: string;
  trainingInstanceStartTime: Date;
  trainingInstanceEndTime: Date;

  constructor() {}
}
