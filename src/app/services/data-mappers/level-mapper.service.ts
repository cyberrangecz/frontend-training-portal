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

  /**
   * Maps an array of level DTOs to an array of levels
   * @param levelDTOs array of level DTOs
   */
  mapLevelDTOsToLevels(levelDTOs: AbstractLevelDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    levelDTOs.forEach(levelDTO => result.push(this.mapLevelDTOToLevel(levelDTO)));
    return result;
  }

  /**
   * Maps levelDTO to level object
   * @param levelDTO levelDTO received from remote server
   */
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

  /**
   * Maps game level object to GameLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
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

  /**
   * Maps info level object to InfoLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
  mapInfoLevelToInfoLevelUpdateDTO(level: InfoLevel): InfoLevelUpdateDTO {
    const result = new InfoLevelUpdateDTO();
    result.id = level.id;
    result.content = level.content;
    result.maxScore = level.maxScore;
    result.nextLevel = level.nextLevel;
    result.title = level.title;
    return result;
  }

  /**
   * Maps assessment level object to AssessmentLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
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

  /**
   * Creates game level object from game level dto
   * @param gameLevelDTO game level dto received from remote server
   */
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

  /**
   * Creates info level object from info level dto
   * @param infoLevelDTO info level dto received from remote server
   */
  private createInfoLevelFromDTO(infoLevelDTO: InfoLevelDTO): InfoLevel {
    const result = new InfoLevel();
    this.setAbstractLevelAttributesFromDTO(result, infoLevelDTO);
    result.content = infoLevelDTO.content;
    return result;
  }

  /**
   * Create assessment level object from assessment level dto
   * @param assessmentLevelDTO assessment level dto received from remote server
   */
  private createAssessmentLevelFromDTO(assessmentLevelDTO: AssessmentLevelDTO): AssessmentLevel  {
    const result = new AssessmentLevel();
    this.setAbstractLevelAttributesFromDTO(result, assessmentLevelDTO);
    // result.questions = assessmentLevelDTO.questions;
    result.instructions = assessmentLevelDTO.instructions;
    result.assessmentType = AssessmentTypeEnum[assessmentLevelDTO.type];
    return result;
  }

  /**
   * Helper method which sets abstract level attributes (common for all type of levels) from level DTO
   * @param level level object which attributes should be set accordingly to received dto
   * @param levelDTO level dto received from remote server
   */
  private setAbstractLevelAttributesFromDTO(level: AbstractLevel, levelDTO: AbstractLevelDTO) {
    level.id = levelDTO.id;
    level.title = levelDTO.title;
    level.nextLevel = levelDTO.nextLevel;
    level.maxScore = levelDTO.maxScore;
    // level.preHook = levelDTO.preHook;
    // level.postHook = levelDTO.postHook;
  }
}
