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
import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {HintDTO, HintDTOClass} from "../../model/DTOs/hintDTO";
import {Hint} from "../../model/level/hint";
import {BasicLevelInfoDTO} from "../../model/DTOs/basicLevelInfoDTO";
import LevelTypeEnum = AbstractLevelDTO.LevelTypeEnum;
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';

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
    result.hints = this.mapHintsToHintsDTO(level.hints);
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
    result.type = this.mapAssessmentTypeToDTO(level.assessmentType);
    //TODO: mappping for result.questions = level.questions;
    return result;
  }

  mapBasicInfoDTOsToAbstractLevels(resource: BasicLevelInfoDTO[]): AbstractLevel[] {
    const result: AbstractLevel[] = [];
    resource.forEach(levelDTO => result.push(this.mapBasicInfoDTOToAbstractLevel(levelDTO)));
    return result;
  }

  mapBasicInfoDTOToAbstractLevel(level: BasicLevelInfoDTO): AbstractLevel {
    const result = this.createLevelByType(level.level_type);
    result.id = level.id;
    result.title = level.title;
    result.order = level.order;
    return result;
  }

  mapHintsDTOToHints(hints: HintDTO[]): Hint[] {
    const result: Hint[] = [];
    hints.forEach(hintDto => result.push(this.mapHintDTOToHint(hintDto)));
    return result;
  }

  mapHintDTOToHint(hint: HintDTO): Hint {
    const result = new Hint();
    result.id = hint.id;
    result.content = hint.content;
    result.title = hint.title;
    result.hintPenalty = hint.hint_penalty;
    return result;
  }

  private createLevelByType(levelType: LevelTypeEnum ): AbstractLevel {
    let result: AbstractLevel;
    switch (levelType) {
      case LevelTypeEnum.INFO: {
        result = new InfoLevel();
        result.type = AbstractLevelTypeEnum.Info;
        return result;
      }
      case LevelTypeEnum.ASSESSMENT: {
        result = new AssessmentLevel();
        result.type = AbstractLevelTypeEnum.Assessment;
        return result;
      }
      case LevelTypeEnum.GAME: {
        result = new GameLevel();
        result.type = AbstractLevelTypeEnum.Game;
        return result;
      }
      default: {
        console.error('Level data in wrong format. Level was not created.');
        return null;
      }
    }
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
    if (gameLevelDTO.hints) {
      result.hints = this.mapHintsDTOToHints(gameLevelDTO.hints);
    }
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
    result.instructions = assessmentLevelDTO.instructions;
    result.assessmentType = this.mapAssessmentTypeFromDTO(assessmentLevelDTO.assessment_type);
    if (assessmentLevelDTO.questions && assessmentLevelDTO.questions != '[]') {
      result.questions = this.mapQuestionsFromDTO(JSON.parse(assessmentLevelDTO.questions));
    }
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

  private mapAssessmentTypeFromDTO(type: AssessmentLevelDTO.AssessmentTypeEnum): AssessmentTypeEnum {
    switch (type) {
      case AssessmentLevelDTO.AssessmentTypeEnum.TEST: return AssessmentTypeEnum.Test;
      case AssessmentLevelDTO.AssessmentTypeEnum.QUESTIONNAIRE: return AssessmentTypeEnum.Questionnaire;
      default: console.error('Could not map AssessmentType to any known type');
    }
  }

  private mapAssessmentTypeToDTO(type: AssessmentTypeEnum): AssessmentLevelDTO.AssessmentTypeEnum {
    switch (type) {
      case AssessmentTypeEnum.Test: return AssessmentLevelDTO.AssessmentTypeEnum.TEST;
      case AssessmentTypeEnum.Questionnaire: return  AssessmentLevelDTO.AssessmentTypeEnum.QUESTIONNAIRE ;
      default: console.error('Could not map AssessmentType to any known DTO');
    }
  }

  private mapHintsToHintsDTO(hints: Hint[]): HintDTO[]  {
    const result: HintDTO[] = [];
    hints.forEach(hint => result.push(this.mapHintToHintDTO(hint)));
    return result;
  }

  private mapHintToHintDTO(hint: Hint): HintDTO {
    const result = new HintDTOClass();
    result.id = hint.id;
    result.content = hint.content;
    result.title = hint.title;
    result.hint_penalty = hint.hintPenalty;
    return result;
  }

  private mapQuestionsToDTO(questions: AbstractQuestion[]) {

  }

  private mapQuestionsFromDTO(questions): AbstractQuestion[] {
    const result: AbstractQuestion[] = [];
    questions.forEach(question => result.push(this.mapQuestionFromDTO(question)));
    return result;
  }

  private mapQuestionToDto(question: AbstractQuestion) {

  }

  private mapQuestionFromDTO(question): AbstractQuestion {
    switch (question.question_type) {
      case 'FFQ': return this.mapFFQQuestionFromDTO(question);
      case 'EMI': return this.mapEMIQuestionFromDTO(question);
      case 'MCQ': return this.mapMCQQuestionFromDTO(question);
      default: console.error('Could not map question from JSON to any of known types');
    }
  }

  private mapFFQQuestionFromDTO(questionDTO): FreeFormQuestion {
    const result = new FreeFormQuestion(questionDTO.text);
    const answers: string[] = [];
    this.mapAbtractQuestionAttributesFromDTO(questionDTO, result);
    if (questionDTO.correct_choices) {
      questionDTO.correct_choices.forEach(choice => answers.push(choice));
    }
    result.correctAnswers = answers;
    return result;
  }

  private mapEMIQuestionFromDTO(questionDTO): ExtendedMatchingItems {
    const result = new ExtendedMatchingItems(questionDTO.text);
    this.mapAbtractQuestionAttributesFromDTO(questionDTO, result);
    const answers: {x: number, y: number}[] = [];
    const rows: string[] = [];
    const cols: string[] = [];

    questionDTO.choices.forEach(choice => {
      const half = Math.floor((questionDTO.choices.length) / 2);
      if (choice.order < half) {
        rows.push(choice.text);
        if (choice.pair) {
          answers.push({x: choice.order, y: choice.pair - half});
        }
      } else {
        cols.push(choice.text);
      }
    });
    result.rows = rows;
    result.cols = cols;
    result.correctAnswers = answers;
    return result;
  }

  private mapMCQQuestionFromDTO(questionDTO): MultipleChoiceQuestion {
    const result = new MultipleChoiceQuestion(questionDTO.text);
    this.mapAbtractQuestionAttributesFromDTO(questionDTO, result);
    const answers: number[] = [];
    const options: string[] = [];
    questionDTO.choices
      .filter(choice => choice.is_correct)
      .forEach(correctChoice => answers.push(correctChoice.order));
    result.correctAnswersIndexes = answers;

    questionDTO.choices
      .sort((a, b) => a.order - b.order)
      .forEach(choice => options.push(choice.text));
    result.options = options;
    return result;
  }

  private mapAbtractQuestionAttributesFromDTO(questionDTO, question: AbstractQuestion) {
    question.required = questionDTO.answer_required;
    question.penalty = questionDTO.penalty;
    question.score = questionDTO.points;
    question.order = questionDTO.order;
  }
}
