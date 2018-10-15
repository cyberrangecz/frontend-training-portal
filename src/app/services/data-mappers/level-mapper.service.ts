import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {GameLevel} from "../../model/level/game-level";
import {GameLevelUpdateDTO} from "../../model/DTOs/gameLevelUpdateDTO";
import {InfoLevelUpdateDTO} from "../../model/DTOs/infoLevelUpdateDTO";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AssessmentLevelUpdateDTO} from "../../model/DTOs/assessmentLevelUpdateDTO";
import {GameLevelDTO} from "../../model/DTOs/gameLevelDTO";
import {InfoLevelDTO} from "../../model/DTOs/infoLevelDTO";
import {AssessmentLevelDTO} from "../../model/DTOs/assessmentLevelDTO";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";
import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";

@Injectable()
export class LevelMapperService {

  mapLevelDTOsToLevels(levelDTOs: AbstractLevelDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    levelDTOs.forEach(levelDTO => result.push(this.mapLevelDTOToLevel(levelDTO)));
    return result;
  }

  mapLevelDTOToLevel(levelDTO: AbstractLevelDTO): AbstractLevel {
    switch(levelDTO.levelType) {
      case AbstractLevelDTO.LevelTypeEnum.GAME: {
        return this.createGameLevelFromDTO(levelDTO);
      }
      case AbstractLevelDTO.LevelTypeEnum.INFO: {
        return this.createInfoLevelFromDTO(levelDTO);
      }
      case AbstractLevelDTO.LevelTypeEnum.ASSESSMENT: {
        return this.createAssessmentLevelFromDTO(levelDTO);
      }
    }
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

  private createGameLevelFromDTO(gameLevelDTO: GameLevelDTO): GameLevel {
    const result = new GameLevel();
    this.setAbstractLevelAttributesFromDTO(result, gameLevelDTO);
    result.type = AbstractLevelTypeEnum.Game;
    result.flag = gameLevelDTO.flag;
    result.content = gameLevelDTO.content;
    result.solution = gameLevelDTO.solution;
    result.incorrectFlagLimit = gameLevelDTO.incorrectFlagLimit;
    result.solutionPenalized = gameLevelDTO.solutionPenalized;
    result.estimatedDuration = gameLevelDTO.estimatedDuration;
    result.attachments = gameLevelDTO.attachments;
    return result;
  }

  private createInfoLevelFromDTO(infoLevelDTO: InfoLevelDTO): InfoLevel {
    const result = new InfoLevel();
    this.setAbstractLevelAttributesFromDTO(result, infoLevelDTO);
    result.content = infoLevelDTO.content;
    return result;
  }

  private createAssessmentLevelFromDTO(assessmentLevelDTO: AssessmentLevelDTO): AssessmentLevel  {
    const result = new AssessmentLevel();
    this.setAbstractLevelAttributesFromDTO(result, assessmentLevelDTO);
    // result.questions = assessmentLevelDTO.questions;
    result.instructions = assessmentLevelDTO.instructions;
    result.assessmentType = AssessmentTypeEnum[assessmentLevelDTO.type];
    return result;
  }

  private setAbstractLevelAttributesFromDTO(level: AbstractLevel, levelDTO: AbstractLevelDTO) {
    level.id = levelDTO.id;
    level.title = levelDTO.title;
    level.nextLevel = levelDTO.nextLevel;
    level.maxScore = levelDTO.maxScore;
    // level.preHook = levelDTO.preHook;
    // level.postHook = levelDTO.postHook;
  }
}
