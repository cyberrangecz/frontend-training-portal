import {Injectable} from "@angular/core";
import {TrainingDefinition} from "../../model/training/training-definition";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {GameLevel} from "../../model/level/game-level";
import {InfoLevel} from "../../model/level/info-level";
import {Observable} from "rxjs";
import {TrainingDefinitionMapperService} from "../data-mappers/training-definition-mapper.service";
import {LevelMapperService} from "../data-mappers/level-mapper.service";
import {map} from "rxjs/operators";
import {TrainingDefinitionDTO} from "../../model/DTOs/trainingDefinitionDTO";
import {AbstractLevel} from "../../model/level/abstract-level";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {BasicLevelInfoDTO} from "../../model/DTOs/basicLevelInfoDTO";

/**
 * Service to abstract communication with training definition endpoint.
 * Can send requests to create, edit, delete training definition.
 */
@Injectable()
export class TrainingDefinitionSetterService {

  constructor(private http: HttpClient,
              private trainingDefinitionMapper: TrainingDefinitionMapperService,
              private levelMapper: LevelMapperService) {
  }
  /**
   * Sends request to remove training definition with provided id
   * @param {number} trainingDefId id of training definition which should be removed
   */
  removeTrainingDefinition(trainingDefId: number) {
    return this.http.delete(environment.trainingDefsEndpointUri + trainingDefId,
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Sends request to clone training definition
   * @param trainingDefId id of training definition which should be cloned
   */
  cloneTrainingDefinition(trainingDefId: number): Observable<number> {
    return this.http.post<number>(environment.trainingDefsEndpointUri + trainingDefId,
      {},
      { headers: this.createDefaultHeaders()});
  }


  /**
   * Sends request to update training definition
   * @param trainingDef updated training definition
   */
  updateTrainingDefinition(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.put<number>(environment.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDef),
      { headers: this.createDefaultHeaders()})
  }

  /**
   * Sends request to create new training definition and returns id of the created training definition
   * @param {TrainingDefinition} trainingDef training definition which should be created
   */
  createTrainingDefinition(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.post<number>(environment.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDef),
      { headers: this.createDefaultHeaders()})
      .pipe(map(trainingDef => (trainingDef as TrainingDefinitionDTO).id));
  }

  /**
   * Creates new assessment level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param assessmentLevel new assessment level which should be created in DB
   */
  createAssessmentLevel(trainingDefId: number): Observable<AssessmentLevel> {
    return this.http.post<AbstractLevelDTO>(environment.trainingDefsEndpointUri + trainingDefId + '/levels/ASSESSMENT',
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOToAbstractLevel(resp) as AssessmentLevel));
  }

  /**
   * Creates new game level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param gameLevel new game level which should be created in DB
   */
  createGameLevel(trainingDefId: number): Observable<GameLevel> {
    return this.http.post<AbstractLevelDTO>(environment.trainingDefsEndpointUri + trainingDefId + '/levels/GAME',
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOToAbstractLevel(resp) as GameLevel));
  }

  /**
   * Creates new info level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param infoLevel new info level which should be created in DB
   */
  createInfoLevel(trainingDefId: number): Observable<InfoLevel> {
    return this.http.post<AbstractLevelDTO>(environment.trainingDefsEndpointUri + trainingDefId + '/levels/INFO',
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOToAbstractLevel(resp) as InfoLevel));
  }

  /**
   * Removes level from DB
   * @param trainingDefId id of training definition associated with the level which should be deleted
   * @param levelId id of level which should be removed
   */
  removeLevel(trainingDefId: number, levelId: number) {
    return this.http.delete(environment.trainingDefsEndpointUri + trainingDefId +
      '/levels/' + levelId,
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Updates game level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param gameLevel game level which should be updated
   */
  updateGameLevel(trainingDefId: number, gameLevel: GameLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/game-levels',
      this.levelMapper.mapGameLevelToGameLevelUpdateDTO(gameLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Updates info level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param infoLevel info level which should be updated
   */
  updateInfoLevel(trainingDefId: number, infoLevel: InfoLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/info-levels',
      this.levelMapper.mapInfoLevelToInfoLevelUpdateDTO(infoLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Updates assessment level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param assessmentLevel assessment level which should be updated
   */
  updateAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/assessment-levels',
      this.levelMapper.mapAssessmentLevelToAssessmentLevelUpdateDTO(assessmentLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Swaps order with level on the left
   * @param trainingDefId id of training definition id associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapLeft(trainingDefId: number, levelId: number): Observable<AbstractLevel[]> {
    return this.http.put<BasicLevelInfoDTO[]>(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + levelId + '/swap-left',
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)));
  }

  /**
   * Swaps order with level on the right
   * @param trainingDefId id of training definition associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapRight(trainingDefId: number, levelId: number): Observable<AbstractLevel[]>{
    return this.http.put<BasicLevelInfoDTO[]>(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + levelId + '/swap-right',
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)));
  }

  /**
   * Swaps order of two levels
   * @param trainingDefId id of training definition associated with the level
   * @param firstLevelId id of first level which should be swapped
   * @param secondLevelId id of second level which should be swapped
   */
  swap(trainingDefId: number, firstLevelId: number, secondLevelId: number) {
    return this.http.put(environment.trainingDefsEndpointUri + trainingDefId + '/levels/' + firstLevelId + '/swap/' + trainingDefId,
      {},
    { headers: this.createDefaultHeaders()});
  }

  private createDefaultHeaders() {
    let httpHeaderAccepts: string[] = [
      '*/*',
      'application/json'
    ];
    const headers = new HttpHeaders();
    headers.set('Accept', httpHeaderAccepts);
    return headers;
  }
}
