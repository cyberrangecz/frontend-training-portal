import {Level} from '../level/level';

/**
 * Class containing info about accessed training run
 */
export class AccessTrainingRunInfo {
  trainingRunId: number;
  sandboxInstanceId: number;
  currentLevel: Level;
  levels: Level[];
  isStepperDisplayed: boolean;
  startTime: Date;
}
