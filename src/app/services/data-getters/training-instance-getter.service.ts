import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstance} from "../../model/training/training-instance";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingInstanceMapperService} from "../data-mappers/training-instance-mapper.service";
import {TrainingInstanceDTO} from "../../model/DTOs/trainingInstanceDTO";
import {TrainingInstanceRestResource} from '../../model/DTOs/trainingInstanceRestResource';

@Injectable()
/**
 * Service to abstract communication with training instance endpoint.
 * Can retrieve training instances based on various parameters
 */
export class TrainingInstanceGetterService {

  constructor(private http: HttpClient,
              private trainingInstanceMapper: TrainingInstanceMapperService) {
  }

  /**
   * Retrieves all training instances
   * @returns {Observable<TrainingInstance[]>} Observable of training instances list
   */
  getTrainingInstances(): Observable<TrainingInstance[]> {
    return this.http.get<TrainingInstanceRestResource>(environment.trainingInstancesEndpointUri)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstances(response)));
  }

  /**
   * Retrieves all training instance on specified page of a pagination
   * @param page page of pagination
   * @param size size of a page
   * @param sort attribute by which will result be sorted
   * @param sortDir sort direction (asc, desc)
   */
  getTrainingInstancesWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<TrainingInstance[]> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingInstanceRestResource>(environment.trainingInstancesEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstances(response)));
  }



  /**
   * Retrieves training instance by  id
   * @param {number} id of the training distance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no such training instance is found
   */
  getTrainingInstanceById(id: number): Observable<TrainingInstance> {
    return this.http.get<TrainingInstanceDTO>(environment.trainingInstancesEndpointUri + id)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(response)));
  }
  /**
   * Retrieves training instance by keyword
   * @param {string} keyword keyword associated with training instance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no instance with provided keyword is found
   */
  getTrainingInstanceByKeyword(keyword: string): Observable<TrainingInstance> {
    return this.getTrainingInstances()
      .pipe(map(trainingInstances =>
      trainingInstances.find(trainingInstance =>
      trainingInstance.keyword === keyword)))
  }

  /**
   * Downloads training instance
   * @param id id of training instance which should be downloaded
   */
  downloadTrainingInstance(id: number) {
    // TODO: download Training instance
  }
}
