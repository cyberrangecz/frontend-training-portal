import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {GameLevel} from "../../model/level/game-level";
import {GameLevelUpdateDTO} from "../../model/DTOs/gameLevelUpdateDTO";
import {InfoLevelUpdateDTO} from "../../model/DTOs/infoLevelUpdateDTO";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AssessmentLevelUpdateDTO} from "../../model/DTOs/assessmentLevelUpdateDTO";

@Injectable()
export class LevelMapperService {

  mapLevelDTOsToLevels(levelDTOs: AbstractLevelDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    levelDTOs.forEach(levelDTO => result.push(this.mapLevelDTOToLevel(levelDTO)));
    return result;
  }

  mapLevelDTOToLevel(levelDTO: AbstractLevelDTO): AbstractLevel {
    let result: AbstractLevel;
    if (levelDTO) {
    }
    return result;
  }

  mapGameLevelToGameLevelUpdateDTO(level: GameLevel): GameLevelUpdateDTO {
    return null;
  }

  mapInfoLevelToInfoLevelUpdateDTO(level: InfoLevel): InfoLevelUpdateDTO {
    return null;
  }

  mapAssessmentLevelToAssessmentLevelUpdateDTO(level: AssessmentLevel): AssessmentLevelUpdateDTO {
    return null;
  }

  private createGameLevel() {

  }

  private createInfoLevel() {

  }

  private createAssessmentLevel() {

  }

}
