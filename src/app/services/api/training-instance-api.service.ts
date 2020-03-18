import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {KypoRequestedPagination} from 'kypo-common';
import {TrainingInstanceDTO} from '../../model/DTOs/training-instance/training-instance-dto';
import {TrainingInstanceRestResource} from '../../model/DTOs/training-instance/training-instance-rest-resource';
import {TrainingRunRestResource} from '../../model/DTOs/training-run/training-run-rest-resource';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {ResponseHeaderContentDispositionReader} from 'kypo-common';
import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from '../../model/training/training-instance';
import {KypoFilter} from 'kypo-common';
import {KypoParamsMerger} from 'kypo-common';
import {FilterParams} from '../../model/http/params/filter-params';
import {JsonFromBlobConverter} from '../../model/http/response-headers/json-from-blob-converter';
import {TrainingInstanceMapper} from '../../model/mappers/training-instance/training-instance-mapper';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';
import {TrainingRun} from '../../model/training/training-run';
import {TrainingRunMapper} from '../../model/mappers/training-run/training-run-mapper';
import {TrainingInstanceAssignPoolDTO} from '../../model/DTOs/training-instance/training-instance-assign-pool-dto';

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

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve all training instances on specified page of a pagination
   * @param pagination requested pagination
   * @param filters filters to be applied on resources
   */
  getAll(pagination: KypoRequestedPagination, filters: KypoFilter[] = []): Observable<KypoPaginatedResource<TrainingInstance>> {
    const params = KypoParamsMerger.merge([PaginationParams.forJavaAPI(pagination), FilterParams.create(filters)]);
    return this.http.get<TrainingInstanceRestResource>(this.trainingInstancesEndpointUri,
      { params: params })
      .pipe(
        map(response => new KypoPaginatedResource<TrainingInstance>(
          TrainingInstanceMapper.fromDTOs(response.content),
          PaginationMapper.fromJavaAPI(response.pagination)
        ))
      );
  }

  /**
   * Sends http request to retrieves training instance by id
   * @param id id of the training instance
   */
  get(id: number): Observable<TrainingInstance> {
    return this.http.get<TrainingInstanceDTO>(this.trainingInstancesEndpointUri + id)
      .pipe(map(response => TrainingInstanceMapper.fromDTO(response)));
  }

  /**
   * Sends http request to retrieve all training runs associated with training instance
   * @param trainingInstanceId id of a training instance associated with training runs
   * @param pagination requested pagination
   * @param isActive true if active training runs should be retrieved, false if archived training runs should be retrieved
   */
  getAssociatedTrainingRuns(trainingInstanceId: number, pagination: KypoRequestedPagination, isActive = true)
      : Observable<KypoPaginatedResource<TrainingRun>> {
      let params = PaginationParams.forJavaAPI(pagination);
      params = params.append('isActive', isActive.toString());
        return this.http.get<TrainingRunRestResource>(
          this.trainingInstancesEndpointUri + trainingInstanceId + '/' + this.trainingRunsUriExtension,
          { params: params })
          .pipe(
            map(response => new KypoPaginatedResource(
              TrainingRunMapper.fromDTOs(response.content),
              PaginationMapper.fromJavaAPI(response.pagination)
            ))
          );
  }

  /**
   * Sends http request to create new training instance
   * @param trainingInstance training instance which should be created
   */
  create(trainingInstance: TrainingInstance): Observable<TrainingInstance> {
    return this.http.post<TrainingInstanceDTO>(this.trainingInstancesEndpointUri,
      TrainingInstanceMapper.toCreateDTO(trainingInstance))
      .pipe(map(response => TrainingInstanceMapper.fromDTO(response)));
  }

  /**
   * Sends http request to update training instance
   * @param trainingInstance training instance which should be updated
   */
  update(trainingInstance: TrainingInstance): Observable<string> {
    return this.http.put(this.trainingInstancesEndpointUri, TrainingInstanceMapper.toUpdateDTO(trainingInstance),
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
   * Sends http request to archive (download) training instance
   * @param id id of training instance which should be archived
   */
  archive(id: number): Observable<boolean> {
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
        JsonFromBlobConverter.convert(resp,
          ResponseHeaderContentDispositionReader.getFilenameFromResponse(resp, 'archived-training-instance.zip'));
        return true;
      }));
  }

  assignPool(trainingInstanceId: number, poolId: number): Observable<any> {
    return this.http.patch(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/assign-pool`,
      new TrainingInstanceAssignPoolDTO(poolId)
    );
  }

  unassignPool(trainingInstanceId: number): Observable<any> {
    return this.http.patch(`${this.trainingInstancesEndpointUri + trainingInstanceId}/unassign-pool`, {});
  }
}
