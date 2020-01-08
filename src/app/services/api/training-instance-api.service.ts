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
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingInstanceTableRow} from '../../model/table/row/training-instance-table-row';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {TrainingInstance} from '../../model/training/training-instance';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingInstanceMapper} from '../mappers/training-instance-mapper.service';
import {TrainingRunMapper} from '../mappers/training-run-mapper.service';
import {DownloadService} from '../shared/download.service';

/**
 * Service abstracting http communication with training instance endpoints.
 */
@Injectable()
export class TrainingInstanceApi {

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
   * Sends http request to retrieve all training instances on specified page of a pagination
   * @param pagination requested pagination
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<TrainingInstanceTableRow[]>> {
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri,
      { params: PaginationParams.createTrainingsPaginationParams(pagination) })
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOsToTrainingInstances(response)));
  }

  /**
   * Sends http request to retrieves training instance by id
   * @param id id of the training instance
   */
  get(id: number): Observable<TrainingInstance> {
    return this.http.get<TrainingInstanceDTO>(this.trainingInstancesEndpointUri + id)
      .pipe(map(response =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(response)));
  }

  /**
   * Sends http request to retrieve all training runs associated with training instance
   * @param trainingInstanceId id of a training instance associated with training runs
   * @param pagination requested pagination
   * @param isActive true if active training runs should be retrieved, false if archived training runs should be retrieved
   */
  getAssociatedTrainingRuns(trainingInstanceId: number, pagination: RequestedPagination, isActive = true)
      : Observable<PaginatedResource<TrainingRunTableRow[]>> {
      let params = PaginationParams.createTrainingsPaginationParams(pagination);
      params = params.append('isActive', isActive.toString());
        return this.http.get<TrainingRunRestResource>(
          this.trainingInstancesEndpointUri + trainingInstanceId + '/' + this.trainingRunsUriExtension,
          { params: params })
          .pipe(map(response => this.trainingRunMapper.mapTrainingRunDTOsToTrainingRuns(response)));
  }

  /**
   * Sends http request to create new training instance
   * @param trainingInstance training instance which should be created
   */
  create(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceCreateDTO(trainingInstance))
      .pipe(map(trainingInstanceDTO =>
        this.trainingInstanceMapper.mapTrainingInstanceDTOToTrainingInstance(trainingInstanceDTO)));
  }

  /**
   * Sends http request to update training instance
   * @param trainingInstance training instance which should be updated
   */
  update(trainingInstance: TrainingInstance): Observable<string> {
    return this.http.put(this.trainingInstancesEndpointUri,
      this.trainingInstanceMapper.mapTrainingInstanceToTrainingInstanceUpdateDTO(trainingInstance),
      { responseType: 'text'});
  }

  /**
   * Sends http request to delete training instance
   * @param trainingInstanceId id of training instance which should be deleted
   */
  delete(trainingInstanceId: number): Observable<any> {
    return this.http.delete<any>(this.trainingInstancesEndpointUri + trainingInstanceId);
  }

  /**
   * Sends http request to download training instance
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
