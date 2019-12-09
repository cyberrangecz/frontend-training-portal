import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestedPagination} from 'kypo2-table';
import {Observable, of, Subject} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {map, tap} from 'rxjs/operators';
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
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {SandboxInstanceMapper} from '../mappers/sandbox-instance-mapper.service';
import {Cacheable} from 'ngx-cacheable';
import {RequestStage} from '../../model/sandbox/pool/request/stage/request-stage';
import {RequestStageDTO} from '../../model/DTOs/sandbox-instance/request-stage-dto';

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
  private readonly poolCreationRequestUriExtension = 'create-requests/';
  private readonly poolCleanupRequestUriExtension = 'cleanup-requests/';
  private readonly stagesUriExtension = 'stages/';
  private readonly sandboxResourceExtension = 'resources/';

  private readonly stagesEndpointUri = environment.sandboxRestBasePath + this.stagesUriExtension;
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

  getCreationStages(poolId: number, requestId: number, pagination: RequestedPagination): Observable<PaginatedResource<RequestStage[]>> {
    return this.http.get<DjangoResourceDTO<RequestStageDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension + requestId}/${this.stagesUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapRequestStagesDTOToRequestStages(response))
      );
  }

  // TODO: Add getCleanupStages method

  getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapCreateRequestsDTOToCreateRequests(response))
      );
  }

  getCleanupRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest[]>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}`,
      {
        params: PaginationParams.createSandboxPaginationParams(pagination)
      })
      .pipe(
        map(response => this.sandboxInstanceMapper.mapCleanupRequestsDTOToCleanupRequests(response))
      );
  }

  cancelCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/cancel/`);
  }

  retryCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/retry/`);
  }

  cancelCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/cancel/`);
  }

  retryCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/retry/`);
  }

  @Cacheable({
    maxAge: 1000
  })
  getCreateRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/`)
      .pipe(map(response => this.sandboxInstanceMapper.mapCreateRequestDTOToCreateRequest(response)));
  }

  @Cacheable({
    maxAge: 1000
  })
  getCleanupRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/`)
      .pipe(map(response => this.sandboxInstanceMapper.mapCreateRequestDTOToCreateRequest(response)));
  }

  forceStage(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/${this.stagesUriExtension}${stageId}/force/`);
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


  @Cacheable({
    maxAge: environment.apiPollingPeriod
  })
  getOpenstackStageOutput(id: number): Observable<string[]> {
    return of([]);
  }

  @Cacheable({
    maxAge: environment.apiPollingPeriod
  })
  getAnsibleStageOutput(id: number): Observable<string[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const options: Object = {
      responseType: 'text' as 'text',
      headers: headers
    };
    return this.http.get<string>(`${this.stagesEndpointUri + id}/ansible/outputs/`, options)
      .pipe(
        map(resp => resp.split('\\n')),
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
    return this.http.delete(`${this.sandboxEndpointUri + sandboxId}/`, { params: params});
  }

  unlock(sandboxId: number): Observable<any> {
    return this.http.delete(`${this.sandboxEndpointUri + sandboxId}/lock/`);
  }

  lock(sandboxId: number): Observable<any> {
    return this.http.post(`${this.sandboxEndpointUri + sandboxId}/lock/`, {});
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
