import {Injectable} from '@angular/core';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {PoolRequestDTO} from '../../model/DTOs/sandbox-instance/pool-request-dto';
import {RequestStageDTO} from '../../model/DTOs/sandbox-instance/request-stage-dto';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';
import {PoolCreationRequest} from '../../model/sandbox/pool/request/pool-creation-request';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {AnsibleRunStage} from '../../model/sandbox/pool/request/stage/ansible-run-stage';
import {OpenStackStage} from '../../model/sandbox/pool/request/stage/open-stack-stage';
import {RequestStage} from '../../model/sandbox/pool/request/stage/request-stage';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {SandboxInstanceState} from '../../model/enums/sandbox-instance-state';
import {SandboxInstanceResourceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-resource-dto';
import {SandboxInstanceResource} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {PoolCleanupRequest} from '../../model/sandbox/pool/request/pool-cleanup-request';
import {RequestStageState} from '../../model/enums/request-stage-state.enum';
import {DjangoApiPaginationMapper} from './django-api-pagination-mapper';

@Injectable()
/**
 * Maps DTOs of sandbox instances on internal model
 */
export class SandboxInstanceMapper {

  /**
   * Maps paginated pool dtos on internal model
   * @param paginatedDTO dto to be mapped on internal model
   */
  mapPoolsDTOsToPools(paginatedDTO: DjangoResourceDTO<SandboxPoolDTO>): PaginatedResource<SandboxPool[]> {
    const elements = paginatedDTO.results
      .map(poolDTO => this.mapPoolDTOToPool(poolDTO));
    const pagination = DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps pool dto on internal model
   * @param sandboxPoolDTO dto to be mapped on internal model
   */
  mapPoolDTOToPool(sandboxPoolDTO: SandboxPoolDTO): SandboxPool {
    const pool = new SandboxPool();
    pool.id = sandboxPoolDTO.id;
    pool.definitionId = sandboxPoolDTO.definition;
    pool.usedSize = sandboxPoolDTO.size;
    pool.maxSize = sandboxPoolDTO.max_size;
    pool.usedAndMaxSize = `${pool.usedSize}/${pool.maxSize}`;
    return pool;
  }

  /**
   * Maps paginated sandbox instance on internal model
   * @param paginatedDTO dto to be mapped on internal model
   */
  mapSandboxInstanceDTOsToSandboxInstances(paginatedDTO: DjangoResourceDTO<SandboxInstanceDTO>): PaginatedResource<SandboxInstance[]> {
    const elements = paginatedDTO.results
      .map(sandboxDTO => this.mapSandboxInstanceDTOToSandboxInstance(sandboxDTO));
    const pagination = DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps sandbox instance on internal model
   * @param sandboxInstanceDTO dto to be mapped on internal model
   */
  mapSandboxInstanceDTOToSandboxInstance(sandboxInstanceDTO: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = sandboxInstanceDTO.id;
    result.poolId = sandboxInstanceDTO.pool;
    result.state = this.getSandboxStateFromString(sandboxInstanceDTO.status);
    result.stateLabel = sandboxInstanceDTO.status.replace(new RegExp('_', 'g'), ' ');
    result.stateErrorMessage = sandboxInstanceDTO.status_reason;
    result.locked = sandboxInstanceDTO.locked;
    return result;
  }

  /**
   * Maps paginated create requests dtos on internal model
   * @param paginatedDTO dto to be mapped on internal model
   */
  mapCreateRequestsDTOToCreateRequests(paginatedDTO: DjangoResourceDTO<PoolRequestDTO>) {
    const elements = paginatedDTO.results
      .map(requestDTO => this.mapCreateRequestDTOToCreateRequest(requestDTO));
    const pagination = DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps create request dto on internal model
   * @param requestDTO dto to be mapped on internal model
   */
  mapCreateRequestDTOToCreateRequest(requestDTO: PoolRequestDTO): PoolRequest {
    const request = new PoolCreationRequest();
    request.id = requestDTO.id;
    request.poolId = requestDTO.pool;
    request.createdAt = new Date(requestDTO.created);
    return request;
  }

  /**
   * Maps paginated cleanup requests dtos on internal model
   * @param paginatedDTO dto to be mapped on internal model
   */
  mapCleanupRequestsDTOToCleanupRequests(paginatedDTO: DjangoResourceDTO<PoolRequestDTO>) {
    const elements = paginatedDTO.results
      .map(requestDTO => this.mapCleanupRequestDTOToCleanupRequest(requestDTO));
    const pagination =  DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps cleanup request dto on internal model
   * @param requestDTO dto to be mapped on internal model
   */
  mapCleanupRequestDTOToCleanupRequest(requestDTO: PoolRequestDTO): PoolRequest {
    const request = new PoolCleanupRequest();
    request.id = requestDTO.id;
    request.poolId = requestDTO.pool;
    request.createdAt = new Date(requestDTO.created);
    return request;
  }

  /**
   * Maps sandbox instance resource dtos on internal model
   * @param resourcesDTO dto to be mapped on internal model
   */
  mapResourceDTOsToResources(resourcesDTO: SandboxInstanceResourceDTO[]): SandboxInstanceResource[] {
    return resourcesDTO.map(resourceDTO => this.mapResourceDTOToResource(resourceDTO));
  }

  /**
   * Maps sandbox instance resource dto on internal model
   * @param resourceDTO dto to be mapped on internal model
   */
  mapResourceDTOToResource(resourceDTO: SandboxInstanceResourceDTO): SandboxInstanceResource {
    const resource = new SandboxInstanceResource();
    resource.name = resourceDTO.name;
    resource.status = resourceDTO.status;
    resource.type = resourceDTO.type;
    return resource;
  }

  /**
   * Maps paginated request stage dtos on internal model
   * @param paginatedDTO dto to be mapped on internal model
   */
  mapRequestStagesDTOToRequestStages(paginatedDTO: DjangoResourceDTO<RequestStageDTO>) {
    const elements = paginatedDTO.results
      .map(stageDTO => this.mapRequestStageDTOToRequestStage(stageDTO));
    const pagination = DjangoApiPaginationMapper.map(paginatedDTO);
    return new PaginatedResource(elements, pagination);
  }

  /**
   * Maps request stage dto on internal model
   * @param stageDTO dto to be mapped on internal model
   */
  mapRequestStageDTOToRequestStage(stageDTO: RequestStageDTO): RequestStage {
    let stage: RequestStage;
    if (stageDTO.type === 'ANSIBLE' || stageDTO.type === undefined) {
      stage = new AnsibleRunStage();
    } else if (stageDTO.type === 'OPENSTACK') {
      stage = new OpenStackStage();
    } else {
      console.error(`${stageDTO.type} does not match supported RequestStage types`);
    }
    stage.id = stageDTO.id;
    stage.state = this.resolveStageState(stageDTO);
    stage.errorMessage = stageDTO.error_message;

    if (stageDTO.start) {
      stage.start = new Date(stageDTO.start);
    }
    if (stageDTO.end) {
      stage.end = new Date(stageDTO.end);
    }

    // stage.jobId = stageDTO.job_id;
    // stage.description = stageDTO.description;
    // stage.percentFinished = stageDTO.percent;
    // stage.state = RequestStageState[stageDTO.state];
    return stage;
  }

  private resolveStageState(stageDTO: RequestStageDTO): RequestStageState {
    if (stageDTO.failed) {
      return RequestStageState.FAILED;
    }
    if ((stageDTO.start === undefined || stageDTO.start === null) && (stageDTO.end === undefined || stageDTO.end === null)) {
      return RequestStageState.IN_QUEUE;
    }
    if (stageDTO.start !== undefined && stageDTO.start !== null && (stageDTO.end === undefined || stageDTO.end === null)) {
      return RequestStageState.RUNNING;
    }
    return RequestStageState.FINISHED;
  }


  private getSandboxStateFromString(state: string): SandboxInstanceState {
    const lowercasedState = state.toLowerCase();
    if (lowercasedState.includes('delete') && lowercasedState.includes('fail')) {
      return SandboxInstanceState.DELETE_FAILED;
    }
    if (lowercasedState.includes('fail')) {
      return SandboxInstanceState.FAILED;
    }
    if (lowercasedState.includes('delete') && !lowercasedState.includes('progress')) {
      return SandboxInstanceState.DELETE_IN_PROGRESS;
    }
    if (lowercasedState.includes('progress')) {
      return SandboxInstanceState.IN_PROGRESS;
    }
    if (state.toLowerCase().includes('complete')) {
      return SandboxInstanceState.COMPLETE;
    } else {
      return undefined;
    }
  }
}
