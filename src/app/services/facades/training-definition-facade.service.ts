import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User, UserDTO} from 'kypo2-auth';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AbstractLevelDTO} from '../../model/DTOs/level/abstract-level-dto';
import {AssessmentLevelDTO} from '../../model/DTOs/level/assessment/assessment-level-dto';
import {BasicLevelInfoDTO} from '../../model/DTOs/level/basic-level-info-dto';
import {GameLevelDTO} from '../../model/DTOs/level/game/game-level-dto';
import {InfoLevelDTO} from '../../model/DTOs/level/info/info-level-dto';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {TrainingDefinitionDTO} from '../../model/DTOs/training-definition/training-definition-dto';
import {TrainingDefinitionInfoRestResource} from '../../model/DTOs/training-definition/training-definition-info-rest-resource';
import {TrainingDefinitionRestResource} from '../../model/DTOs/training-definition/training-definition-rest-resource';
import {TrainingDefinitionStateEnum} from '../../model/enums/training-definition-state.enum';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {ResponseHeaderContentDispositionReader} from '../../model/http/response-headers/response-header-content-disposition-reader';
import {AbstractLevel} from '../../model/level/abstract-level';
import {AssessmentLevel} from '../../model/level/assessment-level';
import {GameLevel} from '../../model/level/game-level';
import {InfoLevel} from '../../model/level/info-level';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingDefinitionTableRow} from '../../model/table-adapters/training-definition-table-row';
import {TrainingDefinition} from '../../model/training/training-definition';
import {TrainingDefinitionInfo} from '../../model/training/training-definition-info';
import {LevelMapper} from '../mappers/level-mapper.service';
import {TrainingDefinitionMapper} from '../mappers/training-definition-mapper.service';
import {DownloadService} from '../shared/download.service';
import {UploadService} from '../shared/upload.service';

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
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
  getAll(): Observable<TrainingDefinition[]> {
    return this.http.get<TrainingDefinitionRestResource>(this.trainingDefsEndpointUri)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitions(response)));
  }

  getBetaTesters(trainingDefinitionId: number): Observable<User> {
    return this.http.get<UserDTO>(`${this.trainingDefsEndpointUri + trainingDefinitionId}/beta-testers`)
      .pipe(
        map(response => User.fromDTO(response))
      );
  }

  getAuthors(trainingDefinitionId: number): Observable<User> {
    return this.http.get<UserDTO>(`${this.trainingDefsEndpointUri + trainingDefinitionId}/authors`)
      .pipe(
        map(response => User.fromDTO(response))
      );
  }

  /**
   * Retrieves all training definition on specified page of a pagination
   */
  getAllPaginated(pagination: RequestedPagination): Observable<PaginatedResource<TrainingDefinitionTableRow[]>> {
    return this.http.get<TrainingDefinitionRestResource>(this.trainingDefsEndpointUri,
      { params: PaginationParams.createTrainingsPaginationParams(pagination) })
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitionsPaginated(response)));
  }

  getAllForOrganizer(): Observable<TrainingDefinitionInfo[]> {
    return this.http.get<TrainingDefinitionInfoRestResource>(this.trainingDefsEndpointUri + 'for-organizers')
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionsInfoDTOsToTrainingDefinitionsInfo(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @param withLevels
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getById(id: number, withLevels = false): Observable<TrainingDefinition> {
    return this.http.get<TrainingDefinitionDTO>(this.trainingDefsEndpointUri + id)
      .pipe(
        map(response => this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(response, withLevels)),
        );
  }

  changeState(newState: TrainingDefinitionStateEnum, trainingDefinitionId: number): Observable<any> {
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
  download(id: number): Observable<boolean> {
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


  upload(file: File): Observable<TrainingDefinition> {
    return this.uploadService.uploadTrainingDefinition(this.trainingImportEndpointUri + this.trainingDefinitionUriExtension, file)
      .pipe(map(resp => this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(resp, false)));
  }

  /**
   * Sends request to remove training definition with provided id
   * @param {number} trainingDefId id of training definition which should be removed
   */
  delete(trainingDefId: number) {
    return this.http.delete(this.trainingDefsEndpointUri + trainingDefId,
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Sends request to clone training definition
   * @param trainingDefId id of training definition which should be cloned.
   * @param title title of cloned TD
   */
  clone(trainingDefId: number, title: string): Observable<number> {
    let params = new HttpParams();
    params = params.append('title', title);
    return this.http.post<number>(this.trainingDefsEndpointUri + trainingDefId,
      {},
      {
        params: params,
        headers: this.createDefaultHeaders()
      });
  }


  /**
   * Sends request to update training definition
   * @param trainingDef updated training definition
   */
  update(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.put<number>(this.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionUpdateDTO(trainingDef),
      { headers: this.createDefaultHeaders()});
  }

  /**
   * Sends request to create new training definition and returns id of the created training definition
   * @param {TrainingDefinition} trainingDef training definition which should be created
   */
  create(trainingDef: TrainingDefinition): Observable<number> {
    return this.http.post<TrainingDefinitionDTO>(this.trainingDefsEndpointUri,
      this.trainingDefinitionMapper.mapTrainingDefinitionToTrainingDefinitionCreateDTO(trainingDef),
      { headers: this.createDefaultHeaders()})
      .pipe(map(resp => resp.id));
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
   * Swaps order of two levels
   * @param trainingDefId id of training definition associated with the level
   * @param fromId id of first level which should be swapped
   * @param toId id of second level which should be swapped
   */
  swapLevels(trainingDefId: number, fromId: number, toId: number): Observable<AbstractLevel[]> {
    return this.http.put<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}${fromId}/swap-with/${toId}`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(
        map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)),
      );
  }

  moveLevels(trainingDefId: number, levelId: number, toPosition: number): Observable<AbstractLevel[]> {
    return this.http.put<BasicLevelInfoDTO[]>(`${this.trainingDefsEndpointUri + trainingDefId}/${this.levelsUriExtension}${levelId}/move-to/${toPosition}`,
      {},
      { headers: this.createDefaultHeaders()})
      .pipe(
        map(resp => this.levelMapper.mapBasicInfoDTOsToAbstractLevels(resp)),
      );
  }

  private createDefaultHeaders() {
    const httpHeaderAccepts: string[] = [
      '*/*',
      'application/json'
    ];
    const headers = new HttpHeaders();
    headers.set('Accept', httpHeaderAccepts);
    return headers;
  }

}
