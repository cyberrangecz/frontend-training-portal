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
    const result = new GameLevelUpdateDTO();
    result.id = level.id;
    result.content = level.content;
    result.estimatedDuration = level.estimatedDuration;
    result.flag = level.flag;
    result.attachments = level.attachments;
    result.incorrectFlagLimit = level.incorrectFlagLimit;
    result.maxScore = level.maxScore;
    result.nextLevel = level.nextLevel;
    result.solution = level.solution;
    result.solutionPenalized = level.solutionPenalized;
    result.title = level.title;
    return result;
  }

  mapInfoLevelToInfoLevelUpdateDTO(level: InfoLevel): InfoLevelUpdateDTO {
    const result = new InfoLevelUpdateDTO();
    result.id = level.id;
    result.content = level.content;
    result.maxScore = level.maxScore;
    result.nextLevel = level.nextLevel;
    result.title = level.title;
    return result;
  }

  mapAssessmentLevelToAssessmentLevelUpdateDTO(level: AssessmentLevel): AssessmentLevelUpdateDTO {
    const result = new AssessmentLevelUpdateDTO();
    result.id = level.id;
    result.instructions = level.instructions;
    result.maxScore = level.maxScore;
    result.nextLevel = level.nextLevel;
    // result.questions = level.questions;
    result.title = level.title;
    result.type = AssessmentLevelUpdateDTO.TypeEnum[level.type];
    return result;
  }

  private createGameLevel() {

  }

  private createInfoLevel() {

  }

  private createAssessmentLevel() {

  }

}
