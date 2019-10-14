import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User, UserDTO} from 'kypo2-auth';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {TrainingInstanceDTO} from '../../model/DTOs/training-instance/training-instance-dto';
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/training-instance-rest-resource';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {ResponseHeaderContentDispositionReader} from '../../model/http/response-headers/response-header-content-disposition-reader';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingInstanceTableRow} from '../../model/table-adapters/training-instance-table-row';
import {TrainingRunTableRow} from '../../model/table-adapters/training-run-table-row';
import {TrainingInstance} from '../../model/training/training-instance';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingInstanceMapper} from '../mappers/training-instance-mapper.service';
import {TrainingRunMapper} from '../mappers/training-run-mapper.service';
import {DownloadService} from '../shared/download.service';

@Injectable()
/**
 * Service to abstract communication with training instance endpoint.
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
  getAll(): Observable<TrainingInstance[]> {
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstances(response)));
  }

  /**
   * Retrieves all training instance on specified page of a pagination
   */
  getPaginated(pagination: RequestedPagination): Observable<PaginatedResource<TrainingInstanceTableRow[]>> {
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri,
      { params: PaginationParams.createTrainingsPaginationParams(pagination) })
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstancesWithPagination(response)));
  }

  getOrganizers(trainingInstanceId: number): Observable<User> {
    return this.http.get<UserDTO>(`${this.trainingInstancesEndpointUri + trainingInstanceId}/organizers`)
      .pipe(
        map(response => User.fromDTO(response))
      );
  }

  /**
   * Retrieves training instance by  id
   * @param {number} id of the training distance
   * @returns {Observable<TrainingInstance>} Observable of training instance, null if no such training instance is found
   */
  getById(id: number): Observable<TrainingInstance> {
    return this.http.get<TrainingInstanceDTO>(this.trainingInstancesEndpointUri + id)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(response)));
  }

  getAssociatedTrainingRuns(trainingInstanceId: number, isActive = true): Observable<TrainingRun[]> {
    const params = new HttpParams().set('isActive', isActive.toString());
    return this.http.get<TrainingRunRestResource>(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.trainingRunsUriExtension}`)
      .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  hasTrainingRuns(trainingInstanceId: number): Observable<boolean> {
    return this.http.get<TrainingRunRestResource>(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.trainingRunsUriExtension}`)
      .pipe(map(response => response.content && response.content.length > 0));
  }


  getAssociatedTrainingRunsPaginated(trainingInstanceId: number, pagination: RequestedPagination, isActive = true)
      : Observable<PaginatedResource<TrainingRunTableRow[]>> {
      let params = PaginationParams.createTrainingsPaginationParams(pagination);
      params = params.append('isActive', isActive.toString());
        return this.http.get<TrainingRunRestResource>(
          this.trainingInstancesEndpointUri + trainingInstanceId + '/' + this.trainingRunsUriExtension,
          { params: params })
          .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRunsWithPagination(response)));
  }

  /**
   * Sends request to create new training instance in DB and returns id of the created training instance
   * @param {TrainingInstance} trainingInstance training instance which should be created
   */
  create(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends request to update training instance in DB
   * @param trainingInstance training instance which should be updated
   */
  update(trainingInstance: TrainingInstance): Observable<string> {
    return this.http.put(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance),
      { responseType: 'text'});
  }

  /**
   * Sends request to delete training instance from DB
   * @param trainingInstanceId id of training instance which should be deleted
   */
  delete(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(this.trainingInstancesEndpointUri + trainingInstanceId);
  }

  /**
   * Downloads training instance
   * @param id id of training instance which should be downloaded
   */
  download(id: number): Observable<boolean> {
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
          ResponseHeaderContentDispositionReader.getFilenameFromResponse(resp, 'archived-training-instance.zip'));
        return true;
      }));
  }
}
