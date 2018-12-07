import {GameLevel} from "../level/game-level";
import {InfoLevel} from "../level/info-level";
import {AssessmentLevel} from "../level/assessment-level";
import {AbstractLevel} from "../level/abstract-level";

export class AccessTrainingRun {
  currentLevel: GameLevel | InfoLevel | AssessmentLevel;
  levels: AbstractLevel[];
}
