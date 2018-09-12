import {AbstractLevel} from "../../level/abstract-level";
import {GameLevel} from "../../level/game-level";
import {InfoLevel} from "../../level/info-level";
import {GameLevelDto} from "./game-level-dto";
import {InfoLevelDto} from "./info-level-dto";
import {AssessmentLevel} from "../../level/assessment-level";
import {AssessmentLevelDto} from "./assessment-level-dto";

export class LevelDtoCreator {

  /**
   * Creates correct DTO based on level type
   * @param level level in the training definition
   */
  static createLevelDto(level: AbstractLevel): GameLevelDto | InfoLevelDto | AssessmentLevelDto {
    if (level instanceof GameLevel) {
      return this.createGameLevelDto(level);
    } else if (level instanceof InfoLevel) {
      return this.createInfoLevelDto(level);
    } else if (level instanceof AssessmentLevel) {
      return this.createAssessmentLevel(level);
    } else {
      return null;
    }
  }

  private static createGameLevelDto(level: GameLevel): GameLevelDto {
    return new GameLevelDto(level);
  }

  private static createInfoLevelDto(level: InfoLevel): InfoLevelDto {
    return new InfoLevelDto(level);
  }

  private static createAssessmentLevel(level: AssessmentLevel): AssessmentLevelDto {
    return new AssessmentLevelDto(level);
  }
}
