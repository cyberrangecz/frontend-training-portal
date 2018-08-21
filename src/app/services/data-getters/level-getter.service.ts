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
      levelJson.questions,
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
