import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/sandbox-instance';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {concatMap, map} from 'rxjs/operators';
import {SandboxInstanceMapper} from '../mappers/sandbox-instance-mapper.service';
import {TrainingInstance} from '../../model/training/training-instance';
@Injectable()
/**
 * Service to abstract communication with sandbox instance endpoint
 */
export class SandboxInstanceFacade {

  private readonly trainingInstancesUriExtension = 'training-instances/';
  private readonly sandboxInstancesUriExtension = 'sandbox-instances/';
  private readonly  poolsUriExtension = 'pools/';

  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly  trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstancesUriExtension;

  constructor(private http: HttpClient,
              private sandboxInstanceMapper: SandboxInstanceMapper) {
  }

  getSandboxesInPool(poolId: number): Observable<SandboxInstance[]> {
    return this.http.get<SandboxInstanceDTO[]>(this.poolsEndpointUri + poolId + '/sandboxes/')
      .pipe(map(sandboxDTOs => this.sandboxInstanceMapper.mapSandboxInstanceDTOsToSandboxInstances(sandboxDTOs)));
  }

  /**
   * Sends request to create pool for sandboxes of selected training instance
   * @param trainingInstanceId
   */
  createPool(trainingInstanceId: number): Observable<number> {
    return this.http.post<number>(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.poolsUriExtension}`,
      null);
  }

  /**
   * Sends request to allocate all sandboxes for selected training instance
   * @param trainingInstanceId
   * @param count
   */
  allocateSandboxes(trainingInstanceId: number, count: number = 0): Observable<any> {
    let params = new HttpParams();
    if (count > 0) {
      params = new HttpParams().set('count', count.toString());
    }
    return this.http.post(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`, null,
      {params: params});
  }

  createPoolAndAllocate(trainingInstance: TrainingInstance, count: number = 0): Observable<number> {
    return this.createPool(trainingInstance.id)
      .pipe(
        concatMap(poolId => {
          trainingInstance.poolId = poolId;
          return this.allocateSandboxes(trainingInstance.id, count);
        }),
        map(resp => trainingInstance.poolId));
  }

  deleteSandbox(trainingInstanceId: number, sandboxId: number): Observable<any> {
    return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {
        params: {sandboxIds: sandboxId.toString()}
      }
    );
  }

  deleteSandboxes(trainingInstanceId: number, sandboxIds: [number]): Observable<any> {
    return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {
        params: {sandboxIds: sandboxIds.toString()}
      }
    );
  }

  allocateSandbox(trainingInstanceId: number, count: number = 1): Observable<any> {
    let params = new HttpParams();
    params = params.append('count', count.toString());
    return this.http.post(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.sandboxInstancesUriExtension}`,
      {},
      {
        params: params
      });
  }}
