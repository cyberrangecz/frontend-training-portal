import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ActiveUserService} from "../active-user.service";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import {InfoLevel} from "../../model/level/info-level";
import {Observable, pipe} from "rxjs";
import {map} from "rxjs/operators";
import {LevelDtoCreator} from "../../model/DTOs/level/level-dto-creator";

/**
 * Service to abstract communication with training definition endpoint.
 * Can send requests to create, edit, delete training definition.
 */
@Injectable()
export class TrainingDefinitionSetterService {

  constructor(private http: HttpClient) {
  }

  /**
   * Sends request to remove training definition with provided id
   * @param {number} trainingDefId id of training definition which should be removed
   */
  removeTrainingDefinition(trainingDefId: number) {
    return this.http.delete(environment.trainingDefsEndpointUri + trainingDefId);
  }

  /**
   * Sends request to clone training definition
   * @param trainingDefId id of training definition which should be cloned
   */
  cloneTrainingDefinition(trainingDefId: number) {
    return this.http.post(environment.trainingDefsEndpointUri + trainingDefId, {});
  }


  /**
   * Sends request to update training definition
   * @param trainingDef updated training definition
   */
  updateTrainingDefinition(trainingDef: TrainingDefinition) {
    return this.http.put(environment.trainingDefsEndpointUri, trainingDef)
  }

  /**
   * Sends request to create new training definition and returns id of the created training definition
   * @param {TrainingDefinition} trainingDef training definition which should be created
   */
  addTrainingDefinition(trainingDef: TrainingDefinition) {
    return this.http.post(environment.trainingDefsEndpointUri, trainingDef);
  }

  /**
   * Creates new assessment level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param assessmentLevel new assessment level which should be created in DB
   */
  createAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel): Observable<number> {
    return this.http.post<number>(environment.trainingDefsEndpointUri + trainingDefId + '/assessment-levels', assessmentLevel);
  }

  /**
   * Creates new game level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param gameLevel new game level which should be created in DB
   */
  createGameLevel(trainingDefId: number, gameLevel: GameLevel): Observable<number> {
    return this.http.post<number>(environment.trainingDefsEndpointUri + trainingDefId + '/game-levels', gameLevel);
  }

  /**
   * Creates new info level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param infoLevel new info level which should be created in DB
   */
  createInfoLevel(trainingDefId: number, infoLevel: InfoLevel): Observable<number> {
    return this.http.post<number>(environment.trainingDefsEndpointUri + trainingDefId + '/info-levels', infoLevel);
  }

  /**
   * Swaps order with level on the left
   * @param trainingDefId id of training definition id associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapLeft(trainingDefId: number, levelId: number) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + levelId + '/swap-left',null);
  }

  /**
   * Swaps order with level on the right
   * @param trainingDefId id of training definition associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapRight(trainingDefId: number, levelId: number) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + levelId + '/swap-right',null);
  }

  /**
   * Swaps order of two levels
   * @param trainingDefId id of training definition associated with the level
   * @param firstLevelId id of first level which should be swapped
   * @param secondLevelId id of second level which should be swapped
   */
  swap(trainingDefId: number, firstLevelId: number, secondLevelId: number) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + firstLevelId + '/swap/' + trainingDefId,null);
  }

  /**
   * Removes level from DB
   * @param trainingDefId id of training definition associated with the level which should be deleted
   * @param levelId id of level which should be removed
   */
  removeLevel(trainingDefId: number, levelId: number) {
    return this.http.delete(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + levelId);
  }

  /**
   * Updates game level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param gameLevel game level which should be updated
   */
  updateGameLevel(trainingDefId: number, gameLevel: GameLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/game-levels', gameLevel);
  }

  /**
   * Updates info level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param infoLevel info level which should be updated
   */
  updateInfoLevel(trainingDefId: number, infoLevel: InfoLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/info-levels', infoLevel);
  }

  /**
   * Updates assessment level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param assessmentLevel assessment level which should be updated
   */
  updateAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/assessment-levels', assessmentLevel);
  }
}
