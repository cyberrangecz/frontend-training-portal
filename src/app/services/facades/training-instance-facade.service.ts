import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstance} from "../../model/training/training-instance";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingInstanceMapper} from "../mappers/training-instance-mapper.service";
import {TrainingInstanceDTO} from "../../model/DTOs/training-instance/trainingInstanceDTO";
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/trainingInstanceRestResource';
import {TrainingRun} from "../../model/training/training-run";
import {TrainingRunMapper} from "../mappers/training-run-mapper.service";
import {TrainingRunRestResource} from "../../model/DTOs/training-run/trainingRunRestResource";
import {TableDataWithPaginationWrapper} from "../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingInstanceTableDataModel} from "../../model/table-models/training-instance-table-data-model";
import {TrainingRunTableDataModel} from "../../model/table-models/training-run-table-data-model";

@Injectable()
/**
 * Service to abstract communication with training instance endpoint.
 * Can retrieve training instances based on various parameters
 */
export class TrainingInstanceFacade {

  constructor(private http: HttpClient,
              private trainingRunMapper: TrainingRunMapper,
              private trainingInstanceMapper: TrainingInstanceMapper) {
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
  getTrainingInstancesWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<TableDataWithPaginationWrapper<TrainingInstanceTableDataModel[]>> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingInstanceRestResource>(environment.trainingInstancesEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstancesWithPagination(response)));
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

  getTrainingRunsByTrainingInstanceId(trainingInstanceId: number): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(environment.trainingInstancesEndpointUri + trainingInstanceId + '/training-runs/')
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  getTrainingRunsByTrainingInstanceIdWithPagination(trainingInstanceId: number, page: number, size: number, sort: string, sortDir: string)
      : Observable<TableDataWithPaginationWrapper<TrainingRunTableDataModel[]>> {
      let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
        return this.http.get<TrainingRunRestResource>(
          environment.trainingInstancesEndpointUri + trainingInstanceId + '/training-runs/',
          { params: params })
          .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRunsWithPagination(response)));
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  createTrainingInstance(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(environment.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  updateTrainingInstance(trainingInstance: TrainingInstance): Observable<string> {
    return this.http.put<string>(environment.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance));
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  removeTrainingInstance(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(environment.trainingInstancesEndpointUri + trainingInstanceId);
  }

  /**
   * Sends request to create pool for sandboxes of selected training isntance
   * @param trainingInstanceId
   */
  createPool(trainingInstanceId: number): Observable<number> {
    return this.http.post<number>(environment.trainingInstancesEndpointUri + trainingInstanceId + '/pools', null);
  }

  /**
   * Sends request to allocate all sandboxes for selected training instance
   * @param trainingInstanceId
   */
  allocateSandboxesForTrainingInstance(trainingInstanceId: number ): Observable<any> {
    return this.http.post<any>(environment.trainingInstancesEndpointUri + trainingInstanceId + '/sandbox-instances', null);
  }

  /**
   * Downloads training instance
   * @param id id of training instance which should be downloaded
   */
  downloadTrainingInstance(id: number) {
    // TODO: download Training instance
  }
}
