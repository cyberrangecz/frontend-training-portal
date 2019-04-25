import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {Observable} from "rxjs/internal/Observable";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingDefinitionMapper} from "../mappers/training-definition-mapper.service";
import {AbstractLevel} from "../../model/level/abstract-level";
import {AbstractLevelDTO} from "../../model/DTOs/level/abstractLevelDTO";
import {GameLevelDTO} from "../../model/DTOs/level/game/gameLevelDTO";
import {InfoLevelDTO} from "../../model/DTOs/level/info/infoLevelDTO";
import {AssessmentLevelDTO} from "../../model/DTOs/level/assessment/assessmentLevelDTO";
import {LevelMapper} from "../mappers/level-mapper.service";
import {GameLevel} from "../../model/level/game-level";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {TrainingDefinitionRestResource} from "../../model/DTOs/training-definition/trainingDefinitionRestResource";
import {TrainingDefinitionDTO} from "../../model/DTOs/training-definition/trainingDefinitionDTO";
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingDefinitionTableData} from "../../model/table-models/training-definition-table-data";
import {BasicLevelInfoDTO} from "../../model/DTOs/level/basicLevelInfoDTO";
import {DownloadService} from '../download.service';
import {UploadService} from '../upload.service';
import {ResponseHeaderContentDispositionReader} from '../../model/http/response-headers/response-header-content-disposition-reader';
import {TrainingDefinitionStateEnum} from '../../enums/training-definition-state.enum';
import {TrainingDefinitionInfo} from '../../model/training/training-definition-info';
import {TrainingDefinitionInfoRestResource} from '../../model/DTOs/training-definition/training-definition-info-rest-resource';

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
 * Can retrieve training definition based on several parameters
 */
export class TrainingDefinitionFacade {
  readonly trainingDefinitionUriExtension = 'training-definitions/';
  readonly exportsUriExtension = 'exports/';
  readonly importsUriExtension = 'imports/';
  readonly sandboxDefinitionUriExtension = 'sandbox-definitions/';
  readonly levelsUriExtension = 'levels/';

  readonly trainingDefsEndpointUri = environment.trainingRestBasePath + this.trainingDefinitionUriExtension;
  readonly trainingExportEndpointUri = environment.trainingRestBasePath + this.exportsUriExtension;
  readonly trainingImportEndpointUri = environment.trainingRestBasePath + this.importsUriExtension;


  constructor(private http: HttpClient,
              private downloadService: DownloadService,
              private uploadService: UploadService,
              private levelMapper: LevelMapper,
              private trainingDefinitionMapper: TrainingDefinitionMapper) {
  }

  /**
   * Retrieves all training definitions
   * @returns {Observable<TrainingDefinition[]>} Observable of training definitions list
   */
  getTrainingDefinitions(): Observable<TrainingDefinition[]> {
    return this.http.get<TrainingDefinitionRestResource>(this.trainingDefsEndpointUri)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitions(response)));
  }

  /**
   * Retrieves all training definition on specified page of a pagination
   * @param page page of pagination
   * @param size size of a page
   * @param sort attribute by which will result be sorted
   * @param sortDir sort direction (asc, desc)
   */
  getTrainingDefinitionsWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<TableDataWithPaginationWrapper<TrainingDefinitionTableData[]>> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingDefinitionRestResource>(this.trainingDefsEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitionsWithPagination(response)));
  }

  getTrainingDefinitionsForOrganizers(): Observable<TrainingDefinitionInfo[]> {
    return this.http.get<TrainingDefinitionInfoRestResource>(this.trainingDefsEndpointUri)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionsInfoDTOsToTrainingDefinitionsInfo(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @param withLevels
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getTrainingDefinitionById(id: number, withLevels = false): Observable<TrainingDefinition> {
    return this.http.get<TrainingDefinitionDTO>(this.trainingDefsEndpointUri + id)
      .pipe(
        map(response => this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(response, withLevels)),
        map(trainingDefinition => this.sortLevelsOfTrainingDefinition(trainingDefinition))
        );
  }

  /**
   * Retrieves training definition by id of associated sandbox definition
   * @param {number} sandboxId id of sandbox definition associated with training definition
   * @returns {Observable<TrainingDefinition[]>} Observable of list of training definitions matching sandbox definition id
   */
  getTrainingDefinitionsAssociatedWithSandboxDefinition(sandboxId: number): Observable<TrainingDefinitionInfo[]> {
    return this.http.get<TrainingDefinitionInfoRestResource>(this.trainingDefsEndpointUri + this.sandboxDefinitionUriExtension + sandboxId)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionsInfoDTOsToTrainingDefinitionsInfo(response)));
  }

  changeTrainingDefinitionState(newState: TrainingDefinitionStateEnum, trainingDefinitionId: number): Observable<any> {
    return this.http.put(`${this.trainingDefsEndpointUri + trainingDefinitionId}/states/${this.trainingDefinitionMapper.mapTrainingDefStateToDTOEnum(newState)}`,
      {});
  }

  /**
   * Retrieves level with matching id
   * @param levelId id of level which should be retrieved
   */
  getLevelById(levelId: number): Observable<GameLevel | InfoLevel | AssessmentLevel> {
    return this.http.get<GameLevelDTO | InfoLevelDTO | AssessmentLevelDTO>(this.trainingDefsEndpointUri + this.levelsUriExtension + levelId)
      .pipe(map(response =>
      this.levelMapper.mapLevelDTOToLevel(response)));
  }

  /**
   * Downloads Training Definition file. Returns observable of boolean. True is returned when the data are received correctly
   * @param id id of training definition which should be downloaded
   */
  downloadTrainingDefinition(id: number) : Observable<boolean> {
    const headers = new HttpHeaders();
    headers.set('Accept', [
      'application/octet-stream'
    ]);

    return this.http.get(this.trainingExportEndpointUri + this.trainingDefinitionUriExtension + id,
      {
        responseType: 'blob',
        observe: 'response',
        headers: headers
      })
      .pipe(map(resp =>  {
        this.downloadService.downloadJSONFileFromBlobResponse(resp,
          ResponseHeaderContentDispositionReader.getFilenameFromResponse(resp, 'training-definition.json'));
        return true;
      }));
  }


  uploadTrainingDefinition(file: File): Observable<TrainingDefinition> {
    return this.uploadService.uploadTrainingDefinition(this.trainingImportEndpointUri + this.trainingDefinitionUriExtension, file)
      .pipe(map(resp => this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(resp, false)));
  }

  /**
   * Sends request to remove training definition with provided id
   * @param {number} trainingDefId id of training definition which should be removed
   */
  deleteTrainingDefinition(trainingDefId: number) {
    return this.http.delete(this.trainingDefsEndpointUri + trainingDefId,
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Sends request to clone training definition
   * @param trainingDefId id of training definition which should be cloned
   */
  cloneTrainingDefinition(trainingDefId: number): Observable<number> {
    return this.http.post<number>(this.trainingDefsEndpointUri + trainingDefId,
      {},
      { headers: this.createDefaultHeaders()});
  }


  /**
   * Sends request to update training definition
   * @param trainingDef updated training definition
   */
  updateTrainingDefinition(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.put<number>(this.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDef),
      { headers: this.createDefaultHeaders()})
  }

  /**
   * Sends request to create new training definition and returns id of the created training definition
   * @param {TrainingDefinition} trainingDef training definition which should be created
   */
  createTrainingDefinition(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.post<TrainingDefinitionDTO>(this.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDef),
      { headers: this.createDefaultHeaders()})
      .pipe(map(trainingDef => trainingDef.id));
  }

  /**
   * Creates new assessment level associated with training definition
   * @param trainingDefId id of training definition which should be associated with the new level
   * @param assessmentLevel new assessment level which should be created in DB
   */
  createAssessmentLevel(trainingDefId: number): Observable<AssessmentLevel> {
    return this.http.post<AbstractLevelDTO>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}ASSESSMENT`,
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
    return this.http.post<AbstractLevelDTO>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}GAME`,
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
    return this.http.post<AbstractLevelDTO>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}INFO`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOToAbstractLevel(resp) as InfoLevel));
  }

  /**
   * Removes level from DB
   * @param trainingDefId id of training definition associated with the level which should be deleted
   * @param levelId id of level which should be removed
   */
  deleteLevel(trainingDefId: number, levelId: number): Observable<AbstractLevel[]> {
    return this.http.delete<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}${levelId}`,
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)));
  }

  /**
   * Updates game level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param gameLevel game level which should be updated
   */
  updateGameLevel(trainingDefId: number, gameLevel: GameLevel) {
    return this.http.put(`${this.trainingDefsEndpointUri + trainingDefId}/game-levels`,
      this.levelMapper.mapGameLevelToGameLevelUpdateDTO(gameLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Updates info level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param infoLevel info level which should be updated
   */
  updateInfoLevel(trainingDefId: number, infoLevel: InfoLevel) {
    return this.http.put(`${this.trainingDefsEndpointUri + trainingDefId}/info-levels`,
      this.levelMapper.mapInfoLevelToInfoLevelUpdateDTO(infoLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Updates assessment level in DB
   * @param trainingDefId id of training definition associated with the level
   * @param assessmentLevel assessment level which should be updated
   */
  updateAssessmentLevel(trainingDefId: number, assessmentLevel: AssessmentLevel) {
    return this.http.put(`${this.trainingDefsEndpointUri + trainingDefId}/assessment-levels`,
      this.levelMapper.mapAssessmentLevelToAssessmentLevelUpdateDTO(assessmentLevel),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Swaps order with level on the left
   * @param trainingDefId id of training definition id associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapLeft(trainingDefId: number, levelId: number): Observable<AbstractLevel[]> {
    return this.http.put<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}${levelId}/swap-left`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(
        map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)),
        map(levels => levels.sort((levelA, levelB ) => levelA.order - levelB.order))
      );
  }

  /**
   * Swaps order with level on the right
   * @param trainingDefId id of training definition associated with the level
   * @param levelId id of a level which should be swapped
   */
  swapRight(trainingDefId: number, levelId: number): Observable<AbstractLevel[]>{
    return this.http.put<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}${levelId}/swap-right`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(
        map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)),
        map(levels => levels.sort((levelA, levelB ) => levelA.order - levelB.order))
      );
  }

  /**
   * Swaps order of two levels
   * @param trainingDefId id of training definition associated with the level
   * @param firstLevelId id of first level which should be swapped
   * @param secondLevelId id of second level which should be swapped
   */
  swap(trainingDefId: number, firstLevelId: number, secondLevelId: number) {
    return this.http.put<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId + this.levelsUriExtension}/${firstLevelId}/swap/${trainingDefId}`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(
        map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)),
        map(levels => levels.sort((levelA, levelB ) => levelA.order - levelB.order))
      );
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

  private sortLevelsOfTrainingDefinition(trainingDefinition: TrainingDefinition): TrainingDefinition {
    const sortedLevels: AbstractLevel[] = [];
    if (trainingDefinition && trainingDefinition.startingLevelId && trainingDefinition.levels && trainingDefinition.levels.length > 0) {
      let currentLevel = this.findLevel(trainingDefinition.levels, trainingDefinition.startingLevelId);
      sortedLevels.push(currentLevel);
      while (currentLevel && currentLevel.hasNextLevel()) {
        currentLevel = this.findLevel(trainingDefinition.levels, currentLevel.nextLevelId);
        sortedLevels.push(currentLevel);
      }
      trainingDefinition.levels = sortedLevels;
    }
    return trainingDefinition;
  }

  private findLevel(levels: AbstractLevel[], levelId): AbstractLevel {
    return levels.find(level => level.id === levelId);
  }

}
