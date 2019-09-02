import {GameLevel} from '../level/game-level';
import {InfoLevel} from '../level/info-level';
import {AssessmentLevel} from '../level/assessment-level';
import {AbstractLevel} from '../level/abstract-level';
import {Hint} from '../level/hint';

export class AccessTrainingRunInfo {
  trainingRunId: number;
  sandboxInstanceId: number;
  currentLevel: GameLevel | InfoLevel | AssessmentLevel;
  levels: AbstractLevel[];
  isStepperDisplayed: boolean;
  startTime: Date;
}
