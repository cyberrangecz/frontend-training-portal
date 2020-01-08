import {AbstractLevel} from '../level/abstract-level';
import {AssessmentLevel} from '../level/assessment-level';
import {GameLevel} from '../level/game-level';
import {InfoLevel} from '../level/info-level';

/**
 * Class containing info about accessed training run
 */
export class AccessTrainingRunInfo {
  trainingRunId: number;
  sandboxInstanceId: number;
  currentLevel: GameLevel | InfoLevel | AssessmentLevel;
  levels: AbstractLevel[];
  isStepperDisplayed: boolean;
  startTime: Date;
}
