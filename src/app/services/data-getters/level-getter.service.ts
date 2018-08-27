import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AbstractLevel} from "../../model/level/abstract-level";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentTypeEnum} from "../../enums/assessment-type.enum";
import {Hint} from "../../model/level/hint";
import {AbstractQuestion} from "../../model/questions/abstract-question";
import {FreeFormQuestion} from "../../model/questions/free-form-question";
import {QuestionTypeEnum} from "../../enums/question-type.enum";
import {MultipleChoiceQuestion} from "../../model/questions/multiple-choice-question";
import {ExtendedMatchingItems} from "../../model/questions/extended-matching-items";

@Injectable()
/**
 * Service abstracting the level endpoint.
 * Can retrieve level or levels based on several parameters
 */
export class LevelGetterService {

  constructor(private http: HttpClient) {
  }

  /**
   * Returns level with matching id
   * @param {number} levelId id of level which should be retrieved
   * @returns {Observable<AbstractLevel>} observable of retrieved level, null if no such level is found
   */
  getLevelById(levelId: number): Observable<AbstractLevel> {
    return this.getLevels().pipe(map(levels => {
      return levels.find(level =>
        level.trainingDefinitionId === levelId)
    }))
  }

  /**
   * Returns all levels
   * @returns {Observable<AbstractLevel[]>} observable of list of levels
   */
  getLevels(): Observable<AbstractLevel[]> {
    return this.http.get(environment.getLevelsUri).pipe(map(response => {
        return this.parseLevels(response);
      }));
  }


  /**
   * Returns all levels with matching training definition id
   * @param {number} trainingDefId id of training definition by which should levels be retrieved
   * @returns {Observable<AbstractLevel[]>} observable of list of levels with matching training definition id
   */
  getLevelsByTrainingDefId(trainingDefId: number): Observable<AbstractLevel[]> {
    return this.getLevels().pipe(map(levels => {
      return levels.filter(level =>
        level.trainingDefinitionId === trainingDefId)
    }))
  }

  /**
   * Parses response from server to level objects
   * @param levelsJson json from http response
   * @returns {AbstractLevel[]} list of created objects
   */
  private parseLevels(levelsJson): AbstractLevel[] {
    const levels: AbstractLevel[] = [];
    levelsJson.levels.forEach((levelJson) => {
      let level: AbstractLevel;

      if (levelJson.type === 'assessment') {
        level = this.parseAssessmentLevel(levelJson);
      }

      if (levelJson.type === 'game') {
        level = this.parseGameLevel(levelJson);
      }

      if (levelJson.type === 'info') {
        level = this.parseInfoLevel(levelJson);
      }
      levels.push(level);
    });
    return levels;
  }

  private parseAssessmentLevel(levelJson): AssessmentLevel {
    const level = new AssessmentLevel(
      levelJson.training_definition_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      levelJson.pre_hook,
      levelJson.post_hook,
      this.parseQuestions(levelJson.questions),
      this.parseAssessmentTypeString2Enum(levelJson));
    level.id = levelJson.id;
    level.instructions = levelJson.instructions;
    return level;
  }

  /**
   * Parses json from http response and creates game level object
   * @param levelJson json from http response
   * @returns {GameLevel} game level object with parameters from json
   */
  private parseGameLevel(levelJson): GameLevel {
    const level = new GameLevel(
      levelJson.training_definition_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      levelJson.pre_hook,
      levelJson.post_hook,
      levelJson.flag,
      this.parseHints(levelJson.id, levelJson.hints),
      levelJson.content,
      levelJson.solution,
      levelJson.incorrect_flag_count,
      levelJson.incorrect_flag_limit,
      levelJson.solution_penalized);

    level.id = levelJson.id;
    level.estimatedDuration = levelJson.estimated_duration;
    level.attachments = this.parseAttachments(levelJson.attachments);
    return level;
  }

  /**
   * Parses json from http response and creates info level object
   * @param levelJson json from http response
   * @returns {InfoLevel}  info level object with parameters from json
   */
  private parseInfoLevel(levelJson): InfoLevel {
    const level = new InfoLevel(
      levelJson.training_definition_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      levelJson.pre_hook,
      levelJson.post_hook,
      levelJson.content);
    level.id = levelJson.id;
    return level;
  }

  /**
   * Parses json from http response and creates hint objects
   * @param {number} levelId id of level which is associated with hints
   * @param hintsJson json from http response
   * @returns {Hint[]} list of hints with parameters from json
   */
  private parseHints(levelId: number, hintsJson): Hint[] {
    const hints: Hint[] = [];
    hintsJson.forEach(hintJson => {
      const hint = new Hint(
        hintJson.title,
        hintJson.content,
        hintJson.hint_penalty);
      hint.id = hintJson.id;
      hint.gameLevelId = levelId;
      hints.push(hint);
    });
    return hints;
  }

  /**
   * Parses JSON from http response and creates question objects for assessment level
   * @param questionsJson json from http response
   * @returns {AbstractQuestion[]} list of parsed questions
   */
  private parseQuestions(questionsJson): AbstractQuestion[] {
    const questions: AbstractQuestion[] = [];
    questionsJson.forEach(questionJson => {
      questions.push(this.parseQuestion(questionJson));
    });
    return questions
  }

  /**
   * resolves type of question and creates appropriate object with parameters
   * @param questionJson json from http response
   * @returns {AbstractQuestion} parsed question
   */
  private parseQuestion(questionJson): AbstractQuestion {
    if (questionJson.type === 'ffq') {
      return this.parseFreeFormQuestion(questionJson);
    }
    if (questionJson.type === 'emi') {
      return this.parseExtendedMatchingItems(questionJson);
    }
    if (questionJson.type === 'mcq') {
      return this.parseMultipleChoiceQuestion(questionJson);
    }
  }

  /**
   * Resolves if question is assessment of test (has correct answers)
   * @param questionJson json from http response
   * @returns {QuestionTypeEnum} Test if has correct answers, Assessment otherwise
   */
  private resolveQuestionType(questionJson): QuestionTypeEnum {
    return questionJson.is_test ? QuestionTypeEnum.Test : QuestionTypeEnum.Assessment;
  }

  /**
   * Parses free form question json
   * @param questionJson json from http response
   * @returns {FreeFormQuestion} free form question with attributes from the json
   */
  private parseFreeFormQuestion(questionJson): FreeFormQuestion {
    const question = new FreeFormQuestion(questionJson.title);
    question.id = questionJson.id;
    question.type = this.resolveQuestionType(questionJson);
    question.correctAnswer = questionJson.correct_answer;
    return question;
  }

  /**
   * Parses multiple choice question json
   * @param questionJson json from http response
   * @returns {MultipleChoiceQuestion} multiple choice question with attributes from the json
   */
  private parseMultipleChoiceQuestion(questionJson): MultipleChoiceQuestion {
    const question = new MultipleChoiceQuestion(questionJson.title);
    question.id = questionJson.id;
    question.type = this.resolveQuestionType(questionJson);
    question.correctAnswersIndexes = this.parseMCQAnswers(questionJson);
    questionJson.options.forEach(option => question.options.push(option));
    return question;
  }

  /**
   * Parses extended matching items json
   * @param questionJson json from http response
   * @returns {ExtendedMatchingItems} extended matching items with attributes from the json
   */
  private parseExtendedMatchingItems(questionJson): ExtendedMatchingItems {
    const question = new ExtendedMatchingItems(questionJson.title);
    question.rows = [];
    question.cols = [];
    question.id = questionJson.id;
    question.type = this.resolveQuestionType(questionJson);
    questionJson.rows.forEach(row => question.rows.push(row));
    questionJson.cols.forEach(col => question.cols.push(col));
    question.correctAnswers = this.parseEMIAnswers(questionJson);
    return question;
  }

  /**
   * Parses answers for MCQ questions
   * @param questionJson json from http response
   * @returns {number[]} List of indexes of correct answers
   */
  private parseMCQAnswers(questionJson) {
    const answers: number[] = [];
    if (questionJson.correct_answers) {
      questionJson.correct_answers.forEach(answer =>
      answers.push(answer));
    }
    return answers;
  }

  /**
   * Parses answers for EMI questions.
   * @param questionJson json from http response
   * @returns {{x: number; y: number}[]} List of objects with x, y coords of correct answers
   */
  private parseEMIAnswers(questionJson) {
    const answers: {x: number, y: number }[] = [];
    if (questionJson.correct_answers) {
      questionJson.correct_answers.forEach(answer =>
        answers.push({x: answer.x, y: answer.y}));
    }
    return answers;
  }

  /**
   * TBD
   * @param attachmentsJson
   * @returns {string[]}
   */
  private parseAttachments(attachmentsJson): string[] {
    const attachments: string[] = [];

    return attachments;
  }

  /**
   * Parses type of assessment from string to enum
   * @param {string} assessmentType string description of assessment type
   * @returns {AssessmentTypeEnum} matched assessment type enum
   */
  private parseAssessmentTypeString2Enum(assessmentType: string): AssessmentTypeEnum {
    if (assessmentType === 'test') {
      return AssessmentTypeEnum.Test;
    }
    if (assessmentType === 'questionnaire') {
      return AssessmentTypeEnum.Questionnaire
    }
    // error
  }
}
