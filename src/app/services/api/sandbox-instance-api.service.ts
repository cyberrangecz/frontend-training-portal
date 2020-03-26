import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {RequestDTO} from '../../model/DTOs/sandbox-instance/request-dto';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {PoolDTO} from '../../model/DTOs/sandbox-instance/pool-dto';
import {PaginationParams} from '../../model/http/params/pagination-params';
import {Request} from '../../model/sandbox/pool/request/request';
import {SandboxResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-resource';
import {SandboxResourceDTO} from '../../model/DTOs/sandbox-instance/sandbox-resource-dto';
import {Pool} from '../../model/sandbox/pool/pool';
import {KypoPaginatedResource} from 'kypo-common';
import {RequestStage} from '../../model/sandbox/pool/request/stage/request-stage';
import {RequestMapper} from '../../model/mappers/sandbox-instance/request-mapper';
import {PoolMapper} from '../../model/mappers/sandbox-instance/pool-mapper';
import {SandboxInstanceMapper} from '../../model/mappers/sandbox-instance/sandbox-instance-mapper';
import {RequestStageMapper} from '../../model/mappers/sandbox-instance/request-stage-mapper';
import {SandboxResourceMapper} from '../../model/mappers/sandbox-instance/sandbox-resource-mapper';
import {PaginationMapper} from '../../model/mappers/pagination-mapper';
import {KypoRequestedPagination} from 'kypo-common';
import {RequestStageDTO} from '../../model/DTOs/sandbox-instance/stages/request-stage-dto';
import {OpenStackAllocationStage} from '../../model/sandbox/pool/request/stage/open-stack-allocation-stage';
import {OpenStackCleanupStage} from '../../model/sandbox/pool/request/stage/open-stack-cleanup-stage';
import {AnsibleAllocationStage} from '../../model/sandbox/pool/request/stage/ansible-allocation-stage';
import {AnsibleCleanupStage} from '../../model/sandbox/pool/request/stage/ansible-cleanup-stage';
import {OpenstackAllocationStageDTO} from '../../model/DTOs/sandbox-instance/stages/openstack-allocation-stage-dto';
import {OpenstackCleanupStageDTO} from '../../model/DTOs/sandbox-instance/stages/openstack-cleanup-stage-dto';
import {AnsibleAllocationStageDTO} from '../../model/DTOs/sandbox-instance/stages/ansible-allocation-stage-dto';
import {AnsibleCleanupStageDTO} from '../../model/DTOs/sandbox-instance/stages/ansible-cleanup-stage-dto';
import {AnsibleAllocationOutputDTO} from '../../model/DTOs/sandbox-instance/stages/ansible-allocation-output-dto';
import {CleanupRequestStage} from '../../model/sandbox/pool/request/stage/cleanup-request-stage';
import {AllocationRequestStage} from '../../model/sandbox/pool/request/stage/allocation-request-stage';
import {CleanupRequest} from '../../model/sandbox/pool/request/cleanup-request';
import {AllocationRequest} from '../../model/sandbox/pool/request/allocation-request';

/**
 * Service abstracting http communication with sandbox instances endpoints.
 */
@Injectable()
export class SandboxInstanceApi {

  private readonly sandboxInstancesUriExtension = 'sandboxes';
  private readonly poolsUriExtension = 'pools';
  private readonly locksUriExtension = 'locks';
  private readonly sandboxAllocationUnitsUriExtension = 'sandbox-allocation-units';
  private readonly allocationRequestUriExtension = 'allocation-requests';
  private readonly cleanupRequestUriExtension = 'cleanup-requests';
  private readonly stagesUriExtension = 'stages';
  private readonly sandboxResourceExtension = 'resources';

  private readonly stagesEndpointUri = environment.sandboxRestBasePath + this.stagesUriExtension;
  private readonly poolsEndpointUri = environment.sandboxRestBasePath + this.poolsUriExtension;
  private readonly sandboxAllocationEndpointUri = environment.sandboxRestBasePath + this.sandboxAllocationUnitsUriExtension;
  private readonly sandboxEndpointUri = environment.sandboxRestBasePath + this.sandboxInstancesUriExtension;

  constructor(private http: HttpClient) {
  }

  /**
   * Sends http request to retrieve all training instances on specified page of a pagination
   * @param pagination requested pagination
   */
  getPools(pagination: KypoRequestedPagination = null): Observable<KypoPaginatedResource<Pool>> {
    return this.http.get<DjangoResourceDTO<PoolDTO>>(
      this.poolsEndpointUri,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
        new KypoPaginatedResource<Pool>(
          PoolMapper.fromDTOs(response.results),
          PaginationMapper.fromDjangoAPI(response)
        ))
      );
  }

  /**
   * Sends http request to retrieves pool by id
   * @param poolId id of the pool
   */
  getPool(poolId: number): Observable<Pool>  {
  return this.http.get<PoolDTO>(`${this.poolsEndpointUri}/${poolId}`)
    .pipe(
      map(response => PoolMapper.fromDTO(response))
    );
  }

  /**
   * Sends http request to delete a pool
   * @param poolId id of the pool to delete
   */
  deletePool(poolId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri}/${poolId}`);
  }

  /**
   * Sends http request to clear a pool (delete all associated sandbox instances, requests etc.)
   * @param poolId id of the pool to clear
   */
  clearPool(poolId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri + poolId}/${this.sandboxAllocationUnitsUriExtension}`);
  }

  /**
   * Sends http request to create a pool
   */
  createPool(pool: Pool): Observable<Pool> {
    const createPoolDTO = PoolMapper.toCreateDTO(pool);
    return this.http.post<PoolDTO>(this.poolsEndpointUri, createPoolDTO)
      .pipe(
        map(dto => PoolMapper.fromDTO(dto))
      );
  }

  lockPool(poolId: number): Observable<any> {
    return this.http.post(`${this.poolsEndpointUri}/${poolId}/${this.locksUriExtension}`,
      {});
  }

  unlockPool(poolId: number, lockId: number): Observable<any> {
    return this.http.delete(`${this.poolsEndpointUri}/${poolId}/${this.locksUriExtension}/${lockId}`)
  }

  /**
   * Sends http request to retrieve all sandbox instances of pool on specified page of a pagination
   * @param poolId id of the associated pool
   * @param pagination requested pagination
   */
  getSandboxes(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxInstance>> {
    return this.http.get<DjangoResourceDTO<SandboxInstanceDTO>>(
      `${this.poolsEndpointUri}/${poolId}/${this.sandboxInstancesUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new KypoPaginatedResource<SandboxInstance>(
            SandboxInstanceMapper.fromDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to retrieve sandbox instance by id
   * @param sandboxId id of the sandbox instance
   */
  getSandbox(sandboxId: number): Observable<SandboxInstance> {
    return this.http.get<SandboxInstanceDTO>(`${this.sandboxEndpointUri}/${sandboxId}`)
      .pipe(
        map(response => SandboxInstanceMapper.fromDTO(response))
      );
  }

  /**
   * Sends http request to allocate sandbox instances in a pool
   * @param poolId id of the pool in which sandbox instances should be allocated
   * @param count number of sandbox instance that should be allocated
   */
  allocateSandboxes(poolId: number, count: number = 0): Observable<any> {
    let params = new HttpParams();
    if (count > 0) {
      params = new HttpParams().set('count', count.toString());
    }
    return this.http.post(`${this.poolsEndpointUri}/${poolId}/${this.sandboxAllocationUnitsUriExtension}`, null,
      {params: params});
  }

  /**
   * Sends http request to unlock a sandbox instance
   * @param sandboxId id of the sandbox instance to unlock
   * @param lockId od of the lock on sandbox instance
   */
  unlockSandbox(sandboxId: number, lockId: number): Observable<any> {
    return this.http.delete(`${this.sandboxEndpointUri}/${sandboxId}/${this.locksUriExtension}/${lockId}`);
  }

  /**
   * Sends http request to lock a sandbox instance
   * @param sandboxId id of the sandbox instance to lock
   */
  lockSandbox(sandboxId: number): Observable<any> {
    return this.http.post(`${this.sandboxEndpointUri}/${sandboxId}/${this.locksUriExtension}`, {});
  }

  /**
   * Sends http request to retrieve all allocation requests associated with a pool
   * @param poolId id of the allocation unit
   * @param pagination requested pagination
   */
  getAllocationRequests(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AllocationRequest>> {
    return this.http.get<DjangoResourceDTO<RequestDTO>>(`${this.poolsEndpointUri}/${poolId}/${this.allocationRequestUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new KypoPaginatedResource<Request>(
            RequestMapper.fromAllocationDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to retrieve all cleanup requests associated with a pool
   * @param poolId id of the associated pool
   * @param pagination requested pagination
   */
  getCleanupRequests(poolId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<CleanupRequest>> {
    return this.http.get<DjangoResourceDTO<RequestDTO>>(`${this.poolsEndpointUri}/${poolId}/${this.cleanupRequestUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new KypoPaginatedResource<Request>(
            RequestMapper.fromCleanupDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to get allocation request
   * @param allocationUnitId id of the associated allocation unit
   */
  getAllocationRequest(allocationUnitId: number): Observable<Request> {
    return this.http.get<RequestDTO>(`${this.sandboxAllocationEndpointUri}/${allocationUnitId}/allocation-request`)
      .pipe(map(response => RequestMapper.fromAllocationDTO(response)));
  }

  /**
   * Sends http request to get cleanup request
   * @param allocationUnitId id of the associated allocation unit
   * @param requestId id of request to retrieve
   */
  getCleanupRequest(allocationUnitId: number, requestId: number): Observable<CleanupRequest> {
    return this.http.get<RequestDTO>(`${this.sandboxAllocationEndpointUri}/${allocationUnitId}/${this.cleanupRequestUriExtension}/${requestId}`)
      .pipe(map(response => RequestMapper.fromAllocationDTO(response)));
  }

  /**
   * Sends http request to cancel allocation request associated with a pool and a request
   * @param allocationUnitId id of the associated allocation unit
   * @param requestId id of the associated request
   */
  cancelAllocationRequest(allocationUnitId: number, requestId: number): Observable<any> {
    return this.http.patch(
      `${this.sandboxAllocationEndpointUri}/${allocationUnitId}/${this.allocationRequestUriExtension}/${requestId}/cancel`,
      {});
  }

  /**
   * Sends http request to create cleanup request
   * @param allocationUnitId id of the sandbox allocation unit to cleanup
   */
  createCleanupRequest(allocationUnitId: number) {
    return this.http.post(`${this.sandboxAllocationEndpointUri}/${allocationUnitId}/${this.cleanupRequestUriExtension}`, {});
  }

  /**
   * Sends http request to retrieve all creation stages associated with pool and request on specified page of a pagination
   * @param allocationUnitId id of the associated allocation unit
   * @param requestId id of the associated request
   * @param pagination requested pagination
   */
  getAllocationStages(allocationUnitId: number, requestId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<AllocationRequestStage>> {
    return this.http.get<DjangoResourceDTO<RequestStageDTO>>(
      `${this.sandboxAllocationEndpointUri}/${allocationUnitId}/${this.allocationRequestUriExtension}/${requestId}/${this.stagesUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new KypoPaginatedResource<RequestStage>(
            RequestStageMapper.fromAllocationDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to retrieve all creation stages associated with pool and request on specified page of a pagination
   * @param allocationUnitId id of the associated allocation unit
   * @param requestId id of the associated request
   * @param pagination requested pagination
   */
  getCleanupStages(allocationUnitId: number, requestId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<CleanupRequestStage>> {
    return this.http.get<DjangoResourceDTO<RequestStageDTO>>(
      `${this.sandboxAllocationEndpointUri}/${allocationUnitId}/${this.cleanupRequestUriExtension}/${requestId}/${this.stagesUriExtension}`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(response =>
          new KypoPaginatedResource<RequestStage>(
            RequestStageMapper.fromCleanupDTOs(response.results),
            PaginationMapper.fromDjangoAPI(response)
          ))
      );
  }

  /**
   * Sends http request to get allocation openstack stage output
   * @param stageId of the requested stage id
   */
  getOpenstackAllocationStage(stageId: number): Observable<OpenStackAllocationStage> {
    return this.http.get<OpenstackAllocationStageDTO>(`${this.stagesEndpointUri}/allocation/${stageId}/openstack`)
      .pipe(
        map(resp => RequestStageMapper.fromOpenstackAllocationDTO(resp))
      )
  }

  getOpenstackCleanupStage(stageId: number): Observable<OpenStackCleanupStage> {
    return this.http.get<OpenstackCleanupStageDTO>(`${this.stagesEndpointUri}/cleanup/${stageId}/openstack`)
      .pipe(
        map(resp => RequestStageMapper.fromOpenstackCleanupDTO(resp))
      )
  }

  getAnsibleAllocationStage(stageId: number): Observable<AnsibleAllocationStage> {
    return this.http.get<AnsibleAllocationStageDTO>(`${this.stagesEndpointUri}/allocation/${stageId}/ansible`)
      .pipe(
        map(resp => RequestStageMapper.fromAnsibleAllocationDTO(resp))
      )
  }

  getAnsibleCleanupStage(stageId: number): Observable<AnsibleCleanupStage> {
    return this.http.get<AnsibleCleanupStageDTO>(`${this.stagesEndpointUri}/cleanup/${stageId}/ansible`)
      .pipe(
        map(resp => RequestStageMapper.fromAnsibleCleanupDTO(resp))
      )
  }

  /**
   * Sends http request to get ansible stage output
   * @param stageId of the requested stage id
   */
  getAnsibleAllocationStageOutput(stageId: number, pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<string>> {
    return this.http.get<DjangoResourceDTO<AnsibleAllocationOutputDTO>>(`${this.stagesEndpointUri}/allocation/${stageId}/ansible/outputs`,
      {
        params: PaginationParams.forDjangoAPI(pagination)
      })
      .pipe(
        map(resp => new KypoPaginatedResource<string>(
          RequestStageMapper.fromAnsibleAllocationOutputDTOs(resp.results),
          PaginationMapper.fromDjangoAPI(resp)
        ))
      );
  }

  /**
   * Sends http request to get resources associated with a sandbox instance
   * @param allocationUnitId id of the associated allocation unit
   */
  getResources(allocationUnitId: number): Observable<SandboxResource[]> {
    return this.http.get<SandboxResourceDTO[]>(
      `${this.sandboxEndpointUri}/${allocationUnitId}/${this.sandboxResourceExtension}`
    ).pipe(
      map(response => SandboxResourceMapper.fromDTOs(response))
    );
  }

  /**
   * Sends http request to get resource associated with a sandbox instance
   * @param sandboxId id of the associated sandbox instance
   * @param resourceId id of the requested resource
   */
  getResource(sandboxId: number, resourceId: string): Observable<SandboxResource> {
    // TODO: Endpoint is currently only for vms, not all resources. Needs to be updated either here or on backend
    return this.http.get<SandboxResourceDTO>(
      `${this.sandboxEndpointUri}/${sandboxId}/vms/${resourceId}`
    ).pipe(
      map(response => SandboxResourceMapper.fromDTO(response))
    );
  }

}
