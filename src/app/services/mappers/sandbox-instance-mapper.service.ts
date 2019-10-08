import {Injectable} from '@angular/core';
import {SandboxInstanceDTO} from '../../model/DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {DjangoResourceDTO} from '../../model/DTOs/other/django-resource-dto';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {Kypo2Pagination} from '../../model/table-adapters/kypo2-pagination';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {SandboxPoolDTO} from '../../model/DTOs/sandbox-instance/sandbox-pool-dto';
import {PoolRequestDTO} from '../../model/DTOs/sandbox-instance/pool-request-dto';
import {PoolRequest} from '../../model/sandbox/pool/request/pool-request';
import {RequestStageDTO} from '../../model/DTOs/sandbox-instance/request-stage-dto';
import {RequestStage} from '../../model/sandbox/pool/request/stage/request-stage';
import {PoolCreationRequest} from '../../model/sandbox/pool/request/pool-creation-request';
import {AnsibleRunStage} from '../../model/sandbox/pool/request/stage/ansible-run-stage';
import {OpenStackStage} from '../../model/sandbox/pool/request/stage/open-stack-stage';
import {SandboxInstanceState} from '../../model/enums/sandbox-instance-state';

@Injectable()
/**
 * Maps DTOs os sandbox instances to model
 */
export class SandboxInstanceMapper {

  mapPoolsDTOsToPools(paginatedDTO: DjangoResourceDTO<SandboxPoolDTO>): PaginatedResource<SandboxPool[]> {
    const elements = paginatedDTO.results
      .map(poolDTO => this.mapPoolDTOToPool(poolDTO));
    const pagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(elements, pagination);
  }

  mapPoolDTOToPool(sandboxPoolDTO: SandboxPoolDTO): SandboxPool {
    const pool = new SandboxPool();
    pool.id = sandboxPoolDTO.id;
    pool.definitionId = sandboxPoolDTO.definition;
    pool.usedSize = sandboxPoolDTO.size;
    pool.maxSize = sandboxPoolDTO.max_size;
    pool.usedAndMaxSize = `${pool.usedSize}/${pool.maxSize}`;
    return pool;
  }

  mapSandboxInstanceDTOsToSandboxInstances(paginatedDTO: DjangoResourceDTO<SandboxInstanceDTO>): PaginatedResource<SandboxInstance[]> {
    const elements = paginatedDTO.results
      .map(sandboxDTO => this.mapSandboxInstanceDTOToSandboxInstance(sandboxDTO));
    const pagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(elements, pagination);
  }

  mapSandboxInstanceDTOToSandboxInstance(sandboxInstanceDTO: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = sandboxInstanceDTO.id;
    result.poolId = sandboxInstanceDTO.pool;
    result.state = this.getSandboxStateFromString(sandboxInstanceDTO.status);
    result.stateLabel = sandboxInstanceDTO.status.replace(new RegExp('_', 'g'), ' ');
    result.stateErrorMessage = sandboxInstanceDTO.status_reason;
    return result;
  }

  mapRequestsDTOToRequests(paginatedDTO: DjangoResourceDTO<PoolRequestDTO>) {
    const elements = paginatedDTO.results
      .map(requestDTO => this.mapRequestDTOToRequest(requestDTO));
    const pagination = new Kypo2Pagination(
      paginatedDTO.page,
      paginatedDTO.page_count,
      paginatedDTO.page_size,
      paginatedDTO.total_count,
      paginatedDTO.page_count);
    return new PaginatedResource(elements, pagination);
  }

  mapRequestDTOToRequest(requestDTO: PoolRequestDTO): PoolRequest {
    let request: PoolRequest;
    if (requestDTO.type === 'CREATION') {
      request = new PoolCreationRequest();
    } else if (requestDTO.type === 'DELETION') {
      request = new PoolCreationRequest();
    } else {
      console.error(`${requestDTO.type} does not match supported PoolRequest types.`);
    }
    request.id = requestDTO.id;
    request.stages = requestDTO.stages.map(stageDTO => this.mapRequestStageDTOToRequestStage(stageDTO));
    return request;
  }

  private mapRequestStageDTOToRequestStage(stageDTO: RequestStageDTO): RequestStage {
    let stage: RequestStage;
    if (stageDTO.type === 'ANSIBLE_RUN') {
      stage = new AnsibleRunStage();
    } else if (stageDTO.type === 'OPENSTACK') {
      stage = new OpenStackStage();
    } else {
      console.error(`${stageDTO.type} does not match supported RequestStage types`);
    }
    stage.id = stageDTO.id;
    stage.jobId = stageDTO.job_id;
    stage.description = stageDTO.description;
    return stage;
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
