import {Injectable} from "@angular/core";
import {AbstractLevelDTO} from "../../model/DTOs/level/abstractLevelDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {GameLevel} from "../../model/level/game-level";
import {GameLevelUpdateDTO, GameLevelUpdateDTOClass} from "../../model/DTOs/level/game/gameLevelUpdateDTO";
import {InfoLevelUpdateDTO, InfoLevelUpdateDTOClass} from "../../model/DTOs/level/info/infoLevelUpdateDTO";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {AssessmentLevelUpdateDTO, AssessmentLevelUpdateDTOClass} from "../../model/DTOs/level/assessment/assessmentLevelUpdateDTO";
import {GameLevelDTO} from "../../model/DTOs/level/game/gameLevelDTO";
import {InfoLevelDTO} from "../../model/DTOs/level/info/infoLevelDTO";
import {AssessmentLevelDTO} from "../../model/DTOs/level/assessment/assessmentLevelDTO";
import {AbstractLevelTypeEnum} from "../../enums/abstract-level-type.enum";
import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {HintDTO, HintDTOClass} from "../../model/DTOs/level/game/hintDTO";
import {Hint} from "../../model/level/hint";
import {BasicLevelInfoDTO} from "../../model/DTOs/level/basicLevelInfoDTO";
import LevelTypeEnum = AbstractLevelDTO.LevelTypeEnum;
import {AbstractQuestion} from '../../model/questions/abstract-question';
import {FreeFormQuestion} from '../../model/questions/free-form-question';
import {MultipleChoiceQuestion} from '../../model/questions/multiple-choice-question';
import {ExtendedMatchingItems} from '../../model/questions/extended-matching-items';
import {AbstractQuestionCreateDTO, AbstractQuestionDTO} from '../../model/DTOs/level/assessment/abstactQuestionDTO';
import {MultipleChoiceQuestionCreateDTO, MultipleChoiceQuestionCreateDTOClass} from '../../model/DTOs/level/assessment/multipleChoiceQuestionCreateDTO';
import {FreeFormQuestionCreateDTO, FreeFormQuestionDTOClass} from '../../model/DTOs/level/assessment/freeFormQuestionDTO';
import {MCQChoiceDTO} from '../../model/DTOs/level/assessment/mcqChoiceDTO';
import {EMIChoiceDTO} from '../../model/DTOs/level/assessment/emiChoiceDTO';
import {ExtendedMatchingItemsDTO} from '../../model/DTOs/level/assessment/extendedMatchingItemsDTO';

@Injectable()
export class LevelMapper {

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
    result.id = level.id;
    result.title = level.title;
    result.max_score = level.maxScore;
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
    result.id = level.id;
    result.title = level.title;
    result.content = level.content;
    return result;
  }

  /**
   * Maps assessment level object to AssessmentLevelUpdate DTO used in communication with remote server
   * @param level level object which should be mapped to update DTO
   */
  mapAssessmentLevelToAssessmentLevelUpdateDTO(level: AssessmentLevel): AssessmentLevelUpdateDTO {
    const result = new AssessmentLevelUpdateDTOClass();
    result.id = level.id;
    result.title = level.title;
    result.max_score = level.maxScore;
    result.instructions = level.instructions;
    result.type = this.mapAssessmentTypeToDTO(level.assessmentType);
    result.questions = '[]';
    result.questions = JSON.stringify(this.mapQuestionsToDTO(level.questions));
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
    level.nextLevelId = levelDTO.next_level;
    level.maxScore = levelDTO.max_score;
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

  private mapQuestionsToDTO(questions: AbstractQuestion[]): AbstractQuestionCreateDTO[] {
    const result: AbstractQuestionCreateDTO[] = [];
    if (!questions || questions.length < 1) {
      return [];
    }
    let index = 0;
    questions.forEach(question => {
      const questionDTO = this.mapQuestionToDTO(question);
      questionDTO.order = index;
      index++;
      result.push(questionDTO)
    });
    return result;
  }

  private mapQuestionsFromDTO(questions): AbstractQuestion[] {
    const result: AbstractQuestion[] = [];
    questions.forEach(question => result.push(this.mapQuestionFromDTO(question)));
    return result;
  }

  private mapQuestionToDTO(question: AbstractQuestion): AbstractQuestionCreateDTO {
    if (question instanceof FreeFormQuestion) {
      return this.mapFFQToDTO(question);
    }
    if (question instanceof MultipleChoiceQuestion) {
      return this.mapMCQToDTO(question);
    }
    if (question instanceof ExtendedMatchingItems) {
      return this.mapEMIToDTO(question);
    }
  }

  private mapQuestionFromDTO(question): AbstractQuestion {
    switch (question.question_type) {
      case 'FFQ': return this.mapFFQFromDTO(question);
      case 'EMI': return this.mapEMIFromDTO(question);
      case 'MCQ': return this.mapMCQFromDTO(question);
      default: console.error('Could not map question from JSON to any of known types');
    }
  }

  private mapFFQFromDTO(questionDTO): FreeFormQuestion {
    const result = new FreeFormQuestion(questionDTO.text);
    const answers: string[] = [];
    this.mapAbtractQuestionAttributesFromDTO(questionDTO, result);
    if (questionDTO.correct_choices) {
      questionDTO.correct_choices.forEach(choice => answers.push(choice));
    }
    result.correctAnswers = answers;
    return result;
  }

  private mapEMIFromDTO(questionDTO: ExtendedMatchingItemsDTO): ExtendedMatchingItems {
    const result = new ExtendedMatchingItems(questionDTO.text);
    this.mapAbtractQuestionAttributesFromDTO(questionDTO, result);
    result.cols = questionDTO.cols;
    result.rows = questionDTO.rows;
    if (questionDTO.answer_required) {
      this.mapEmiChoicesFromDTO(questionDTO.correct_answers, result);
    }
    return result;
  }

  private mapMCQFromDTO(questionDTO): MultipleChoiceQuestion {
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

  private mapMCQToDTO(question: MultipleChoiceQuestion): MultipleChoiceQuestionCreateDTO {
    const result = new MultipleChoiceQuestionCreateDTOClass();
    this.mapAbstractQuestionAttributesToDTO(question, result);
    result.question_type = AbstractQuestionDTO.QuestionTypeEnum.MCQ;
    this.mapMCQChoicesToDTO(question, result);
    return result;
  }

  private mapEMIToDTO(question: ExtendedMatchingItems): ExtendedMatchingItemsDTO {
    const result = new ExtendedMatchingItemsDTO();
    this.mapAbstractQuestionAttributesToDTO(question, result);
    result.question_type = AbstractQuestionDTO.QuestionTypeEnum.EMI;
    result.rows = question.rows;
    result.cols = question.cols;
    this.mapEMIChoicesToDTO(question, result);
    return result;
  }

  private mapFFQToDTO(question: FreeFormQuestion): FreeFormQuestionCreateDTO {
    const result = new FreeFormQuestionDTOClass();
    this.mapAbstractQuestionAttributesToDTO(question, result);
    result.question_type = AbstractQuestionDTO.QuestionTypeEnum.FFQ;
    result.correct_choices = question.correctAnswers;
    return result;
  }

  private mapAbstractQuestionAttributesToDTO(question: AbstractQuestion, questionDTO: AbstractQuestionCreateDTO) {
    questionDTO.answer_required = question.required;
    questionDTO.order = question.order;
    questionDTO.penalty = question.penalty;
    questionDTO.points = question.score;
    questionDTO.text = question.title;
  }

  private mapEMIChoicesToDTO(question: ExtendedMatchingItems, questionDTO: ExtendedMatchingItemsDTO) {
    if (question.required) {
      questionDTO.correct_answers = question.correctAnswers.map(answer => new EMIChoiceDTO(answer.x, answer.y));
    }
    else {
      questionDTO.correct_answers = [new EMIChoiceDTO(-1, -1)];
    }
  }

  private mapMCQChoicesToDTO(question: MultipleChoiceQuestion, questionDTO: MultipleChoiceQuestionCreateDTO) {
    let index = 0;
    const result: MCQChoiceDTO[] = [];
    question.options.forEach(option => {
      const choice =  new MCQChoiceDTO();
      choice.text = option;
      choice.order = index;
      choice.is_correct = question.correctAnswersIndexes.includes(index);
      result.push(choice);
      index++;
    });
    questionDTO.choices = result;
  }

  private mapEmiChoicesFromDTO(correctAnswersDTO: EMIChoiceDTO[], result: ExtendedMatchingItems) {
    result.correctAnswers = correctAnswersDTO.map(answerDTO =>  {
     return  {
       x : answerDTO.x,
       y: answerDTO.y
     }
    });
  }
}
