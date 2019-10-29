import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestedPagination} from 'kypo2-table';
import {Observable, Subject} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {PoolRequestDTO} from '../../model/DTOs/sandbox-instance/pool-request-dto';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {SandboxInstanceResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceResourceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-resource-dto';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstanceMapper} from '../mappers/sandbox-instance-mapper.service';
import {Cacheable} from 'ngx-cacheable';

const poolCacheBuster: Subject<void> = new Subject();

@Injectable()
/**
 * Service to abstract communication with sandbox instance endpoint
 */
export class SandboxInstanceFacade {

  private readonly trainingInstancesUriExtension = 'training-instances/';
  private readonly javaSandboxInstancesUriExtension = 'sandbox-instances/';

  private readonly pythonSandboxInstancesUriExtension = 'sandboxes/';
  private readonly poolsUriExtension = 'pools/';
  private readonly poolRequestUriExtension = 'requests/';
  private readonly sandboxResourceExtension = 'resources';

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

  @Cacheable({
    maxAge: 1000
  })
  getPool(id: number): Observable<SandboxPool>  {
  return this.http.get<SandboxPoolDTO>(`${this.poolsEndpointUri}${id}/`)
    .pipe(
      map(response => this.sandboxInstanceMapper.mapPoolDTOToPool(response))
    );
  }

  getSandboxes(poolId: number, pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxInstance[]>> {
    return this.http.get<DjangoResourceDTO<SandboxInstanceDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapSandboxInstanceDTOsToSandboxInstances(response))
      );
  }

  @Cacheable({
    maxAge: 1000
  })
  getSandbox(sandboxId: number): Observable<SandboxInstance> {
    return this.http.get<SandboxInstanceDTO>(`${this.sandboxEndpointUri + sandboxId}/`)
      .pipe(
        map(response => this.sandboxInstanceMapper.mapSandboxInstanceDTOToSandboxInstance(response))
      );
  }

  getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/creation-${this.poolRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapRequestsDTOToRequests(response))
      );
  }

  getCleanupRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/cleanup-${this.poolRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapRequestsDTOToRequests(response))
      );
  }

  cancelCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/cleanup-${this.poolRequestUriExtension}${requestId}/cancel`);
  }

  retryCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/cleanup-${this.poolRequestUriExtension}${requestId}/retry`);
  }

  cancelCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/creation-${this.poolRequestUriExtension}${requestId}/cancel`);
  }

  retryCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/creation-${this.poolRequestUriExtension}${requestId}/retry`);
  }

  @Cacheable({
    maxAge: 1000
  })
  getRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.poolsEndpointUri + poolId}/${this.poolRequestUriExtension}${requestId}`)
      .pipe(map(response => this.sandboxInstanceMapper.mapRequestDTOToRequest(response)));
  }

  forceStage(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolRequestUriExtension}${requestId}/stages/${stageId}/force`);
  }

  getResources(sandboxId: number): Observable<SandboxInstanceResource[]> {
    return this.http.get<SandboxInstanceResourceDTO[]>(
      `${this.sandboxEndpointUri + sandboxId}/${this.sandboxResourceExtension}`
    ).pipe(
      map(resourcesDTO => this.sandboxInstanceMapper.mapResourceDTOsToResources(resourcesDTO))
    );
  }

  @Cacheable({
    maxAge: 1000
  })
  getResource(sandboxId: number, resourceId: string): Observable<SandboxInstanceResource> {
    // TODO: Endpoint is currently only for vms, not all resources. Needs to be updated either here or on backend
    return this.http.get<SandboxInstanceResourceDTO>(
      `${this.sandboxEndpointUri + sandboxId}/vms/${resourceId}/`
    ).pipe(
      map(resourceDTO => this.sandboxInstanceMapper.mapResourceDTOToResource(resourceDTO))
    );
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

  deletePool(poolId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri + poolId}/`);
  }

  clearPool(poolId: number): Observable<any> {
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
