import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {TrainingInstance} from "../../model/training/training-instance";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {PaginationParams} from "../../model/http/params/pagination-params";
import {TrainingInstanceMapper} from "../mappers/training-instance-mapper.service";
import {TrainingInstanceDTO} from "../../model/DTOs/training-instance/trainingInstanceDTO";
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/trainingInstanceRestResource';
import {TrainingRun} from "../../model/training/training-run";
import {TrainingRunMapper} from "../mappers/training-run-mapper.service";
import {TrainingRunRestResource} from "../../model/DTOs/training-run/trainingRunRestResource";
import {PaginatedTable} from "../../model/table-adapters/paginated-table";
import {TrainingInstanceTableAdapter} from "../../model/table-adapters/training-instance-table-adapter";
import {TrainingRunTableAdapter} from "../../model/table-adapters/training-run-table-adapter";
import {DownloadService} from "../shared/download.service";
import {ResponseHeaderContentDispositionReader} from '../../model/http/response-headers/response-header-content-disposition-reader';
import {of} from "rxjs";

@Injectable()
/**
 * Service to abstract communication with training instance endpoint.
 * Can retrieve training instances based on various parameters
 */
export class TrainingInstanceFacade {


  readonly exportsUriExtension = 'exports/';
  readonly trainingInstancesUriExtension = 'training-instances/';
  readonly trainingRunsUriExtension = 'training-runs/';

  readonly trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstancesUriExtension;
  readonly trainingExportsEndpointUri = environment.trainingRestBasePath + this.exportsUriExtension;

  constructor(private http: HttpClient,
              private downloadService: DownloadService,
              private trainingRunMapper: TrainingRunMapper,
              private trainingInstanceMapper: TrainingInstanceMapper) {
  }

  /**
   * Retrieves all training instances
   * @returns {Observable<TrainingInstance[]>} Observable of training instances list
   */
  getTrainingInstances(): Observable<TrainingInstance[]> {
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri)
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
  getTrainingInstancesWithPagination(page: number, size: number, sort: string, sortDir: string): Observable<PaginatedTable<TrainingInstanceTableAdapter[]>> {
    let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri, { params: params })
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstancesWithPagination(response)));
  }

  /**
   * Retrieves training instance by  id
   * @param {number} id of the training distance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no such training instance is found
   */
  getTrainingInstanceById(id: number): Observable<TrainingInstance> {
    return this.http.get<TrainingInstanceDTO>(this.trainingInstancesEndpointUri + id)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(response)));
  }


  getTrainingInstanceExists(id: number): Observable<boolean> {
    return this.http.get(this.trainingInstancesEndpointUri + id)
      .pipe(
        map(response => true),
        catchError(err => of(false))
      )
  }

  getTrainingRunsByTrainingInstanceId(trainingInstanceId: number): Observable<TrainingRun[]> {
    return this.http.get<TrainingRunRestResource>(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.trainingRunsUriExtension}`)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  getTrainingRunsByTrainingInstanceIdWithPagination(trainingInstanceId: number, page: number, size: number, sort: string, sortDir: string)
      : Observable<PaginatedTable<TrainingRunTableAdapter[]>> {
      let params = PaginationParams.createPaginationParams(page, size, sort, sortDir);
        return this.http.get<TrainingRunRestResource>(
          this.trainingInstancesEndpointUri + trainingInstanceId + '/' + this.trainingRunsUriExtension,
          { params: params })
          .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRunsWithPagination(response)));
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  createTrainingInstance(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  updateTrainingInstance(trainingInstance: TrainingInstance): Observable<string> {
    return this.http.put(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance),
      { responseType: 'text'});
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  deleteTrainingInstance(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(this.trainingInstancesEndpointUri + trainingInstanceId);
  }

  /**
   * Downloads training instance
   * @param id id of training instance which should be downloaded
   */
  downloadTrainingInstance(id: number): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.set('Accept', [
      'application/octet-stream'
    ]);
    return this.http.get(this.trainingExportsEndpointUri + this.trainingInstancesUriExtension + id,
      {
          responseType: 'blob',
          observe: 'response',
          headers: headers
      })
      .pipe(map(resp =>  {
        this.downloadService.downloadJSONFileFromBlobResponse(resp,
          ResponseHeaderContentDispositionReader.getFilenameFromResponse(resp, 'training-instance.json'));
        return true;
      }));
  }
}
