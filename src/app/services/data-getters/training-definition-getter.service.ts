import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {Observable} from "rxjs/internal/Observable";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingDefinitionMapperService} from "../data-mappers/training-definition-mapper.service";
import {AbstractLevel} from "../../model/level/abstract-level";
import {AbstractLevelDTO} from "../../model/DTOs/abstractLevelDTO";
import {GameLevelDTO} from "../../model/DTOs/gameLevelDTO";
import {InfoLevelDTO} from "../../model/DTOs/infoLevelDTO";
import {AssessmentLevelDTO} from "../../model/DTOs/assessmentLevelDTO";
import {LevelMapperService} from "../data-mappers/level-mapper.service";
import {GameLevel} from "../../model/level/game-level";
import {InfoLevel} from "../../model/level/info-level";
import {AssessmentLevel} from "../../model/level/assessment-level";
import {TrainingDefinitionRestResource} from "../../model/DTOs/trainingDefinitionRestResource";
import {TrainingDefinitionDTO} from "../../model/DTOs/trainingDefinitionDTO";
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingDefinitionTableDataModel} from "../../model/table-models/training-definition-table-data-model";

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
 * Can retrieve training definition based on several parameters
 */
export class TrainingDefinitionGetterService {

  constructor(private http: HttpClient,
              private levelMapper: LevelMapperService,
              private trainingDefinitionMapper: TrainingDefinitionMapperService) {
  }

  /**
   * Retrieves all training definitions
   * @returns {Observable<TrainingDefinition[]>} Observable of training definitions list
   */
  getTrainingDefinitions(): Observable<TrainingDefinition[]> {
    return this.http.get<TrainingDefinitionRestResource>(environment.trainingDefsEndpointUri)
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
  getTrainingDefinitionsWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<TableDataWithPaginationWrapper<TrainingDefinitionTableDataModel[]>> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingDefinitionRestResource>(environment.trainingDefsEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitionsWithPagination(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @param withLevels
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getTrainingDefinitionById(id: number, withLevels = false): Observable<TrainingDefinition> {
    return this.http.get<TrainingDefinitionDTO>(environment.trainingDefsEndpointUri + id)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(response, withLevels)));  }

  /**
   * Downloads Training Definition file
   * @param id id of training definition which should be downloaded
   */
  downloadTrainingDefinition(id: number) {
    // TODO: call to download Training Def
  }

  /**
   * Retrieves training definition by id of associated sandbox definition
   * @param {number} sandboxId id of sandbox definition associated with training definition
   * @returns {Observable<TrainingDefinition[]>} Observable of list of training definitions matching sandbox definition id
   */
  getTrainingDefinitionsBySandboxDefinitionId(sandboxId: number): Observable<TrainingDefinition[]> {
    return this.http.get<TrainingDefinitionRestResource>(environment.trainingDefsEndpointUri + 'sandbox-definitions/' + sandboxId)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitions(response)));
  }

  /**
   * Returns level with matching id
   * @param levelId id of level which should be retrieved
   */
  getLevelById(levelId: number): Observable<GameLevel | InfoLevel | AssessmentLevel> {
    return this.http.get<GameLevelDTO | InfoLevelDTO | AssessmentLevelDTO>(environment.trainingDefsEndpointUri + 'levels/' + levelId)
      .pipe(map(response =>
      this.levelMapper.mapLevelDTOToLevel(response)));
  }
}
