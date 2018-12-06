import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {GameLevel} from "../../model/level/game-level";
import {GameLevelUpdateDTO, GameLevelUpdateDTOClass} from "../../model/DTOs/gameLevelUpdateDTO";
import {InfoLevelUpdateDTO, InfoLevelUpdateDTOClass} from "../../model/DTOs/infoLevelUpdateDTO";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AssessmentLevelUpdateDTO, AssessmentLevelUpdateDTOClass} from "../../model/DTOs/assessmentLevelUpdateDTO";
import {GameLevelDTO} from "../../model/DTOs/gameLevelDTO";
import {InfoLevelDTO} from "../../model/DTOs/infoLevelDTO";
import {AssessmentLevelDTO} from "../../model/DTOs/assessmentLevelDTO";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";

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
  mapLevelDTOToLevel(levelDTO: AbstractLevelDTO): InfoLevel | GameLevel | AssessmentLevel {
    switch(levelDTO.level_type) {
      case AbstractLevelDTO.LevelTypeEnum.GAME: {
        return this.createGameLevelFromDTO(levelDTO as GameLevelDTO);
      }
      case AbstractLevelDTO.LevelTypeEnum.INFO: {
        return this.createInfoLevelFromDTO(levelDTO as InfoLevelDTO);
      }
      case AbstractLevelDTO.LevelTypeEnum.ASSESSMENT: {
        return this.createAssessmentLevelFromDTO(levelDTO as AssessmentLevelDTO);
      }
    }
  }

  /**
   * Maps game level object to GameLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
  mapGameLevelToGameLevelUpdateDTO(level: GameLevel): GameLevelUpdateDTO {
    const result = new GameLevelUpdateDTOClass();
    this.setAbstractLevelDTOAttributesFromObject(level, result);
    result.level_type = AbstractLevelDTO.LevelTypeEnum.GAME;
    result.content = level.content;
    result.estimated_duration = level.estimatedDuration;
    result.flag = level.flag;
    result.attachments = level.attachments;
    result.incorrect_flag_limit = level.incorrectFlagLimit;
    result.solution = level.solution;
    result.solution_penalized = level.solutionPenalized;
    //TODO: map HINTS
    return result;
  }

  /**
   * Maps info level object to InfoLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
  mapInfoLevelToInfoLevelUpdateDTO(level: InfoLevel): InfoLevelUpdateDTO {
    const result = new InfoLevelUpdateDTOClass();
    this.setAbstractLevelDTOAttributesFromObject(level, result);
    result.level_type = AbstractLevelDTO.LevelTypeEnum.INFO;
    result.content = level.content;
    return result;
  }

  /**
   * Maps assessment level object to AssessmentLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
  mapAssessmentLevelToAssessmentLevelUpdateDTO(level: AssessmentLevel): AssessmentLevelUpdateDTO {
    const result = new AssessmentLevelUpdateDTOClass();
    this.setAbstractLevelDTOAttributesFromObject(level, result);
    result.instructions = level.instructions;
    result.level_type = AbstractLevelDTO.LevelTypeEnum.ASSESSMENT;
    //TODO: mapping result.type = level.assessmentType;
    //TODO: mappping for result.questions = level.questions;
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
    result.incorrectFlagLimit = gameLevelDTO.incorrect_flag_limit;
    result.solutionPenalized = gameLevelDTO.solution_penalized;
    result.estimatedDuration = gameLevelDTO.estimated_duration;
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
    result.type = AbstractLevelTypeEnum.Info;
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
    result.type = AbstractLevelTypeEnum.Assessment;
    //TODO: mapping result.questions = assessmentLevelDTO.questions;
    result.instructions = assessmentLevelDTO.instructions;
    // TODO: mapping result.assessmentType = AssessmentTypeEnum[assessmentLevelDTO.]type;
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
    level.nextLevel = levelDTO.next_level;
    level.maxScore = levelDTO.max_score;
    //TODO: mapping level.preHook = levelDTO.preHook;
    //TODO: mapping level.postHook = levelDTO.postHook;
  }

  /**
   *
   * @param level
   * @param levelDto
   */
  private setAbstractLevelDTOAttributesFromObject(level: AbstractLevel, levelDTO: AbstractLevelDTO) {
    levelDTO.id = level.id;
    levelDTO.title = level.title;
    levelDTO.next_level = level.nextLevel;
    levelDTO.max_score = level.maxScore;
    //TODO: mapping levelDTO.post_hook;
    //TODO: mapping levelDTO.pre_hook;
  }
}
