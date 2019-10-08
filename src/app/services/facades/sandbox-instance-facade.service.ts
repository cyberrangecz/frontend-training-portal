import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {map} from 'rxjs/operators';
import {SandboxInstanceMapper} from '../mappers/sandbox-instance-mapper.service';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {RequestedPagination} from 'kypo2-table';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {PoolRequestDTO} from '../../model/DTOs/sandbox-instance/pool-request-dto';
@Injectable()
/**
 * Service to abstract communication with sandbox instance endpoint
 */
export class SandboxInstanceFacade {

  private readonly trainingInstancesUriExtension = 'training-instances/';
  private readonly javaSandboxInstancesUriExtension = 'sandbox-instances/';

  private readonly pythonSandboxInstancesUriExtension = 'sandboxes/';
  private readonly  poolsUriExtension = 'pools/';
  private readonly  poolRequestUriExtension = 'requests/';

  private readonly MOCKENDOPOINT = 'http://localhost:3000/pools/'; // TODO: DELETE
  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly sandboxEndpointUri = environment.sandboxRestBasePath + this.pythonSandboxInstancesUriExtension;
  private readonly  trainingInstancesEndpointUri = environment.trainingRestBasePath + this.trainingInstancesUriExtension;

  constructor(private http: HttpClient,
              private sandboxInstanceMapper: SandboxInstanceMapper) {
  }

  getPools(pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxPool[]>> {
    return this.http.get<DjangoResourceDTO<SandboxPoolDTO>>(
      this.poolsEndpointUri,
    {
        params: PaginationParams.createSandboxPaginationParams(pagination)
    }).pipe(map(response => this.sandboxInstanceMapper.mapPoolsDTOsToPools(response)));
  }

  getPool(id: number): Observable<SandboxPool>  {
  return this.http.get<SandboxPoolDTO>(`${this.poolsEndpointUri}${id}/`)
    .pipe(map(response => this.sandboxInstanceMapper.mapPoolDTOToPool(response)));
  }

  getSandboxes(poolId: number, pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxInstance[]>> {
    return this.http.get<DjangoResourceDTO<SandboxInstanceDTO>>(`${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(map(response => this.sandboxInstanceMapper.mapSandboxInstanceDTOsToSandboxInstances(response)));
  }

  getSandbox(sandboxId: number): Observable<SandboxInstance> {
    return this.http.get<SandboxInstanceDTO>(`${this.sandboxEndpointUri + sandboxId}/`)
      .pipe(map(response => this.sandboxInstanceMapper.mapSandboxInstanceDTOToSandboxInstance(response)));
  }

  getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.MOCKENDOPOINT + poolId}/${this.poolRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(map(response => this.sandboxInstanceMapper.mapRequestsDTOToRequests(response)));
  }

  getDeletionRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.MOCKENDOPOINT + poolId}/${this.poolRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(map(response => this.sandboxInstanceMapper.mapRequestsDTOToRequests(response)));
  }

  getRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.MOCKENDOPOINT + poolId}/${this.poolRequestUriExtension}${requestId}`)
      .pipe(map(response => this.sandboxInstanceMapper.mapRequestDTOToRequest(response)));
  }


  /**
   * Sends request to allocate all sandboxes for selected training instance
   * @param poolId
   * @param count
   */
  allocate(poolId: number, count: number = 0): Observable<any> {
    let params = new HttpParams();
    if (count > 0) {
      params = new HttpParams().set('count', count.toString());
    }
    return this.http.post(`${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`, null,
      {params: params});
  }

  delete(sandboxId: number, hard: boolean = false) {
    const params = new HttpParams().set('hard', hard.toString());
    return this.http.delete(this.sandboxEndpointUri + sandboxId, { params: params});
  }

  clearPool(poolId: number) {
    return this.http.delete(`${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`);
  }

  createPool() {
    return this.http.post(this.poolsEndpointUri, null);
  }

  deleteByTrainingInstance(trainingInstanceId: number, sandboxId: number, isHardDeleted = false): Observable<any> {
    // TODO: Fix, cannot be hard deleted through java api
    if (!isHardDeleted) {
      return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.javaSandboxInstancesUriExtension}`,
        {
          params: {sandboxIds: sandboxId.toString()}
        }
      );
    } else {
      return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.javaSandboxInstancesUriExtension}?hard`,
        {
          params: {sandboxIds: sandboxId.toString()}
        }
      );
    }
  }

  deleteMultipleByTrainingInstance(trainingInstanceId: number, sandboxIds: [number]): Observable<any> {
    return this.http.delete(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.javaSandboxInstancesUriExtension}`,
      {
        params: {sandboxIds: sandboxIds.toString()}
      }
    );
  }

  allocateSandboxByTrainingInstance(trainingInstanceId: number, count: number = 1): Observable<any> {
    let params = new HttpParams();
    params = params.append('count', count.toString());
    return this.http.post(`${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.javaSandboxInstancesUriExtension}`,
      {},
      {
        params: params
      });
  }

  /**
   * Sends request to create pool for sandboxes of selected training instance
   * @param trainingInstanceId
   */
  createPoolByTrainingInstance(trainingInstanceId: number): Observable<number> {
    return this.http.post<number>(
      `${this.trainingInstancesEndpointUri + trainingInstanceId}/${this.poolsUriExtension}`,
      null);
  }
}
