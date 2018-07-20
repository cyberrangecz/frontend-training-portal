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
 *
 */
export class LevelGetterService {

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param {number} levelId
   * @returns {Observable<AbstractLevel>}
   */
  getLevelById(levelId: number): Observable<AbstractLevel> {
    return this.getLevels().pipe(map(levels => {
      return levels.find(level =>
        level.trainingDefinitionId === levelId)
    }))
  }

  /**
   *
   * @returns {Observable<AbstractLevel[]>}
   */
  getLevels(): Observable<AbstractLevel[]> {
    return this.http.get(environment.getLevelsUri).pipe(map(response => {
        return this.parseLevels(response);
      }));
  }


  /**
   *
   * @param {number} trainingDefId
   * @returns {Observable<AbstractLevel[]>}
   */
  getLevelsByTrainingDefId(trainingDefId: number): Observable<AbstractLevel[]> {
    return this.getLevels().pipe(map(levels => {
      return levels.filter(level =>
        level.trainingDefinitionId === trainingDefId)
    }))
  }

  /**
   *
   * @param levelsJson
   * @returns {AbstractLevel[]}
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
      levelJson.training_def_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      new Blob(levelJson.preHook),
      new Blob(levelJson.postHook),
      levelJson.questions,
      this.parseAssessmentTypeString2Enum(levelJson));
    level.id = levelJson.id;
    return level;
  }

  private parseGameLevel(levelJson): GameLevel {
    const level = new GameLevel(
      levelJson.training_def_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      new Blob(levelJson.preHook),
      new Blob(levelJson.postHook),
      levelJson.flag,
      this.parseHints(levelJson.id, levelJson.hints),
      new Blob(levelJson.content),
      new Blob(levelJson.solution),
      levelJson.incorrect_flag_penalty,
      levelJson.solution_penalty);

    level.id = levelJson.id;
    level.estimatedDuration = levelJson.estimated_duration;
    level.attachments = this.parseAttachments(levelJson.attachments);
    return level;
  }

  private parseInfoLevel(levelJson): InfoLevel {
    const level = new InfoLevel(
      levelJson.training_def_id,
      levelJson.title,
      levelJson.max_score,
      levelJson.order,
      new Blob(levelJson.preHook),
      new Blob(levelJson.postHook),
      levelJson.content);
    level.id = levelJson.id;
    return level;
  }

  private parseHints(levelId: number, hintsJson): Hint[] {
    const hints: Hint[] = [];
    hintsJson.forEach(hintJson => {
      const hint = new Hint(
        hintJson.title,
        new Blob(hintJson.content),
        hintJson.hintPenalty);
      hint.id = hintJson.id;
      hint.gameLevelId = levelId;
    });
    return hints;
  }

  private parseAttachments(attachmentsJson): string[] {
    const attachments: string[] = [];

    return attachments;
  }

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
