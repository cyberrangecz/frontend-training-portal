import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {TrainingDefinition} from "../../model/training/training-definition";
import {TrainingDefinitionStateEnum} from "../../enums/training-definition-state.enum";
import {Observable} from "rxjs/internal/Observable";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingDefinitionDTO} from "../../model/DTOs/trainingDefinitionDTO";
import {TrainingDefinitionMapperService} from "../data-mappers/training-definition-mapper.service";
import {AbstractLevel} from "../../model/level/abstract-level";

@Injectable()
/**
 * Service to abstract communication with training definition endpoint.
 * Can retrieve training definition based on several parameters
 */
export class TrainingDefinitionGetterService {

  constructor(private http: HttpClient,
              private trainingDefinitionMapper: TrainingDefinitionMapperService) {
  }

  /**
   * Retrieves all training definitions
   * @returns {Observable<TrainingDefinition[]>} Observable of training definitions list
   */
  getTrainingDefinitions(): Observable<TrainingDefinition[]> {
    return this.http.get<TrainingDefinitionDTO[]>(environment.trainingDefsEndpointUri)
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
  getTrainingDefinitionssWithPaginations(page: number, size: number, sort: string, sortDir: string): Observable<TrainingDefinition[]> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingDefinitionDTO[]>(environment.trainingDefsEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitions(response)));
  }

  /**
   * Retrieves training definition by its id
   * @param {number} id id of training definition
   * @returns {Observable<TrainingDefinition>} Observable of retrieved training definition, null if no training with such id is found
   */
  getTrainingDefinitionById(id: number): Observable<TrainingDefinition> {
    return this.http.get<TrainingDefinitionDTO>(environment.trainingDefsEndpointUri + id)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOToTrainingDefinition(response)));  }

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
    return this.http.get<TrainingDefinitionDTO[]>(environment.trainingDefsEndpointUri + 'sandbox-definitions/' + sandboxId)
      .pipe(map(response =>
        this.trainingDefinitionMapper.mapTrainingDefinitionDTOsToTrainingDefinitions(response)));
  }
}
