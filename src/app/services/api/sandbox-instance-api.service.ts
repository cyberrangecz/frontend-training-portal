import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RequestedPagination} from 'kypo2-table';
import {Observable, of} from 'rxjs';
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
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {Cacheable} from 'ngx-cacheable';
import {RequestStage} from '../../model/sandbox/pool/request/stage/request-stage';
import {RequestStageDTO} from '../../model/DTOs/sandbox-instance/request-stage-dto';
import {PoolRequestMapper} from '../../model/mappers/sandbox-instance/pool-request-mapper';
import {SandboxPoolMapper} from '../../model/mappers/sandbox-instance/sandbox-pool-mapper';
import {SandboxInstanceMapper} from '../../model/mappers/sandbox-instance/sandbox-instance-mapper';
import {RequestStageMapper} from '../../model/mappers/sandbox-instance/request-stage-mapper';
import {SandboxInstanceResourceMapper} from '../../model/mappers/sandbox-instance/sandbox-instance-resource-mapper';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';

/**
 * Service abstracting http communication with sandbox instances endpoints.
 */
@Injectable()
export class SandboxInstanceApi {

  private readonly pythonSandboxInstancesUriExtension = 'sandboxes/';
  private readonly poolsUriExtension = 'pools/';
  private readonly poolCreationRequestUriExtension = 'create-requests/';
  private readonly poolCleanupRequestUriExtension = 'cleanup-requests/';
  private readonly stagesUriExtension = 'stages/';
  private readonly sandboxResourceExtension = 'resources/';

  private readonly stagesEndpointUri = environment.sandboxRestBasePath + this.stagesUriExtension;
  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly sandboxEndpointUri = environment.sandboxRestBasePath + this.pythonSandboxInstancesUriExtension;

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve all training instances on specified page of a pagination
   * @param pagination requested pagination
   */
  getPools(pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxPool>> {
    return this.http.get<DjangoResourceDTO<SandboxPoolDTO>>(
      this.poolsEndpointUri,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
        new PaginatedResource<SandboxPool>(
          SandboxPoolMapper.fromDTOs(response.results),
          PaginationMapper.fromDjangoAPI(response)
        ))
      );
  }

  /**
   * Sends http request to retrieves pool by id
   * @param poolId id of the pool
   */
  @Cacheable({
    maxAge: 1000
  })
  getPool(poolId: number): Observable<SandboxPool>  {
  return this.http.get<SandboxPoolDTO>(`${this.poolsEndpointUri}${poolId}/`)
    .pipe(
      map(response => SandboxPoolMapper.fromDTO(response))
    );
  }

  /**
   * Sends http request to retrieve all sandbox instances of pool on specified page of a pagination
   * @param poolId id of the associated pool
   * @param pagination requested pagination
   */
  getSandboxes(poolId: number, pagination: RequestedPagination = null): Observable<PaginatedResource<SandboxInstance>> {
    return this.http.get<DjangoResourceDTO<SandboxInstanceDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new PaginatedResource<SandboxInstance>(
            SandboxInstanceMapper.fromDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to retrieve sandbox instance by id
   * @param sandboxId id of the sandbox instance
   */
  @Cacheable({
    maxAge: 1000
  })
  getSandbox(sandboxId: number): Observable<SandboxInstance> {
    return this.http.get<SandboxInstanceDTO>(`${this.sandboxEndpointUri + sandboxId}/`)
      .pipe(
        map(response => SandboxInstanceMapper.fromDTO(response))
      );
  }

  /**
   * Sends http request to retrieve all creation stages associated with pool and request on specified page of a pagination
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   * @param pagination requested pagination
   */
  getCreationStages(poolId: number, requestId: number, pagination: RequestedPagination): Observable<PaginatedResource<RequestStage>> {
    return this.http.get<DjangoResourceDTO<RequestStageDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension + requestId}/${this.stagesUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new PaginatedResource<RequestStage>(
            RequestStageMapper.fromDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  // TODO: Add getCleanupStages method

  /**
   * Sends http request to retrieve all creation requests associated with a pool
   * @param poolId id of the associated pool
   * @param pagination requested pagination
   */
  getCreationRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new PaginatedResource<PoolRequest>(
            PoolRequestMapper.fromDTOs(response.results, 'CREATION'),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to retrieve all cleanup requests associated with a pool
   * @param poolId id of the associated pool
   * @param pagination requested pagination
   */
  getCleanupRequests(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<PoolRequest>> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(`${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new PaginatedResource<PoolRequest>(
            PoolRequestMapper.fromDTOs(response.results, 'CLEANUP'),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to cancel creation request associated with a pool and a request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  cancelCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/cancel/`);
  }

  /**
   * Sends http request to retry creation request associated with a pool and a request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  retryCreationRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/retry/`);
  }

  /**
   * Sends http request to cancel cleanup request associated with a pool and a request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  cancelCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/cancel/`);
  }

  /**
   * Sends http request to retry cleanup request associated with a pool and a request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  retryCleanupRequest(poolId: number, requestId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/retry/`);
  }

  /**
   * Sends http request to create new creation request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  @Cacheable({
    maxAge: 1000
  })
  getCreateRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/`)
      .pipe(map(response => PoolRequestMapper.fromDTO(response, 'CREATION')));
  }

  /**
   * Sends http request to create new cleanup request
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   */
  @Cacheable({
    maxAge: 1000
  })
  getCleanupRequest(poolId: number, requestId: number): Observable<PoolRequest> {
    return this.http.get<PoolRequestDTO>(`${this.poolsEndpointUri + poolId}/${this.poolCleanupRequestUriExtension}${requestId}/`)
      .pipe(map(response => PoolRequestMapper.fromDTO(response, 'CLEANUP')));
  }

  /**
   * Sends http request to force stage
   * @param poolId id of the associated pool
   * @param requestId id of the associated request
   * @param stageId id of the associated stage
   */
  forceStage(poolId: number, requestId: number, stageId: number): Observable<any> {
    return this.http.get<DjangoResourceDTO<PoolRequestDTO>>(
      `${this.poolsEndpointUri + poolId}/${this.poolCreationRequestUriExtension}${requestId}/${this.stagesUriExtension}${stageId}/force/`);
  }

  /**
   * Sends http request to get resources associated with a sandbox instance
   * @param sandboxId id of the associated sandbox instance
   */
  getResources(sandboxId: number): Observable<SandboxInstanceResource[]> {
    return this.http.get<SandboxInstanceResourceDTO[]>(
      `${this.sandboxEndpointUri + sandboxId}/${this.sandboxResourceExtension}`
    ).pipe(
      map(response => SandboxInstanceResourceMapper.fromDTOs(response))
    );
  }

  /**
   * Sends http request to get resource associated with a sandbox instance
   * @param sandboxId id of the associated sandbox instance
   * @param resourceId id of the requested resource
   */
  @Cacheable({
    maxAge: 1000
  })
  getResource(sandboxId: number, resourceId: string): Observable<SandboxInstanceResource> {
    // TODO: Endpoint is currently only for vms, not all resources. Needs to be updated either here or on backend
    return this.http.get<SandboxInstanceResourceDTO>(
      `${this.sandboxEndpointUri + sandboxId}/vms/${resourceId}/`
    ).pipe(
      map(response => SandboxInstanceResourceMapper.fromDTO(response))
    );
  }


  /**
   * Sends http request to get openstack stage output
   * @param stageId of the requested stage id
   */
  @Cacheable({
    maxAge: environment.apiPollingPeriod
  })
  getOpenstackStageOutput(stageId: number): Observable<string[]> {
    return of([]);
  }

  /**
   * Sends http request to get ansible stage output
   * @param stageId of the requested stage id
   */
  @Cacheable({
    maxAge: environment.apiPollingPeriod
  })
  getAnsibleStageOutput(stageId: number): Observable<string[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const options: Object = {
      responseType: 'text' as 'text',
      headers: headers
    };
    return this.http.get<string>(`${this.stagesEndpointUri + stageId}/ansible/outputs/`, options)
      .pipe(
        map(resp => resp.split('\\n')),
      );
  }

  /**
   * Sends http request to allocate sandbox instances in a pool
   * @param poolId id of the pool in which sandbox instances should be allocated
   * @param count number of sandbox instance that should be allocated
   */
  allocate(poolId: number, count: number = 0): Observable<any> {
    let params = new HttpParams();
    if (count > 0) {
      params = new HttpParams().set('count', count.toString());
    }
    return this.http.post(`${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`, null,
      {params: params});
  }

  /**
   * Sends http request to delete a sandbox instance
   * @param sandboxId id of the sandbox instance to delete
   * @param hard true if hard delete (without possibility of failing) should be performed, false otherwise.
   * NOTE: Hard delete might take a much longer to process
   */
  delete(sandboxId: number, hard: boolean = false) {
    const params = new HttpParams().set('hard', hard.toString());
    return this.http.delete(`${this.sandboxEndpointUri + sandboxId}/`, { params: params});
  }

  /**
   * Sends http request to unlock a sandbox instance
   * @param sandboxId id of the sandbox instance to unlock
   */
  unlock(sandboxId: number): Observable<any> {
    return this.http.delete(`${this.sandboxEndpointUri + sandboxId}/lock/`);
  }

  /**
   * Sends http request to lock a sandbox instance
   * @param sandboxId id of the sandbox instance to lock
   */
  lock(sandboxId: number): Observable<any> {
    return this.http.post(`${this.sandboxEndpointUri + sandboxId}/lock/`, {});
  }

  /**
   * Sends http request to delete a pool
   * @param poolId id of the pool to delete
   */
  deletePool(poolId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri + poolId}/`);
  }

  /**
   * Sends http request to clear a pool (delete all associated sandbox instances, requests etc.)
   * @param poolId id of the pool to clear
   */
  clearPool(poolId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri + poolId}/${this.pythonSandboxInstancesUriExtension}`);
  }

  /**
   * Sends http request to create a pool
   */
  createPool() {
    return this.http.post(this.poolsEndpointUri, null);
  }
}
