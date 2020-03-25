import {RequestStageState} from '../../enums/request-stage-state.enum';
import {AnsibleAllocationStage} from '../../sandbox/pool/request/stage/ansible-allocation-stage';
import {OpenStackAllocationStage} from '../../sandbox/pool/request/stage/open-stack-allocation-stage';
import {RequestStage} from '../../sandbox/pool/request/stage/request-stage';
import {RequestStageDTO} from '../../DTOs/sandbox-instance/stages/request-stage-dto';
import {OpenstackAllocationStageDTO} from '../../DTOs/sandbox-instance/stages/openstack-allocation-stage-dto';
import {OpenstackCleanupStageDTO} from '../../DTOs/sandbox-instance/stages/openstack-cleanup-stage-dto';
import {AnsibleAllocationStageDTO} from '../../DTOs/sandbox-instance/stages/ansible-allocation-stage-dto';
import {AnsibleCleanupStageDTO} from '../../DTOs/sandbox-instance/stages/ansible-cleanup-stage-dto';
import {AnsibleCleanupStage} from '../../sandbox/pool/request/stage/ansible-cleanup-stage';
import {OpenStackCleanupStage} from '../../sandbox/pool/request/stage/open-stack-cleanup-stage';
import {AnsibleAllocationOutputDTO} from '../../DTOs/sandbox-instance/stages/ansible-allocation-output-dto';
import {AllocationRequestStage} from '../../sandbox/pool/request/stage/allocation-request-stage';
import {CleanupRequestStage} from '../../sandbox/pool/request/stage/cleanup-request-stage';

export class RequestStageMapper {

  static fromAllocationDTOs(dtos: RequestStageDTO[]): AllocationRequestStage[] {
    return dtos.map(dto => RequestStageMapper.fromAllocationDTO(dto));
  }

  static fromAllocationDTO(dto: RequestStageDTO): AllocationRequestStage {
    let stage: RequestStage;
    if (dto.type.toLowerCase() === 'ansible') {
      stage = new AnsibleAllocationStage();
    } else if (dto.type.toLowerCase() === 'openstack') {
      stage = new OpenStackAllocationStage();
    } else {
      console.error(`${dto.type} does not match supported RequestStage types`);
    }
    this.setGeneralAttributes(dto, stage);
    return stage;
  }

  static fromCleanupDTOs(dtos: RequestStageDTO[]): CleanupRequestStage[] {
    return dtos.map(dto => RequestStageMapper.fromCleanupDTO(dto));
  }

  static fromCleanupDTO(dto: RequestStageDTO): CleanupRequestStage {
    let stage: RequestStage;
    if (dto.type.toLowerCase() === 'ansible') {
      stage = new AnsibleCleanupStage();
    } else if (dto.type.toLowerCase() === 'openstack') {
      stage = new OpenStackCleanupStage();
    } else {
      console.error(`${dto.type} does not match supported RequestStage types`);
    }
    this.setGeneralAttributes(dto, stage);
    return stage;
  }


  static fromOpenstackAllocationDTO(dto: OpenstackAllocationStageDTO): OpenStackAllocationStage {
    const stage = new OpenStackAllocationStage();
    this.setGeneralAttributes(dto, stage);
    stage.status = dto.status;
    stage.statusReason = dto.status_reason;
    return stage;
  }

  static fromOpenstackCleanupDTO(dto: OpenstackCleanupStageDTO): OpenStackCleanupStage {
    const stage = new OpenStackCleanupStage();
    this.setGeneralAttributes(dto, stage);
    stage.allocationStage = dto.allocation_stage;
    return stage;
  }

  static fromAnsibleAllocationDTO(dto: AnsibleAllocationStageDTO): AnsibleAllocationStage {
    const stage = new AnsibleAllocationStage();
    this.setGeneralAttributes(dto, stage);
    stage.repoUrl = dto.repo_url;
    stage.rev = dto.rev;
    return stage;
  }

  static fromAnsibleCleanupDTO(dto: AnsibleCleanupStageDTO): AnsibleCleanupStage {
    const stage = new AnsibleCleanupStage();
    this.setGeneralAttributes(dto, stage);
    stage.allocationStage = dto.allocation_stage;
    return stage;
  }

  static fromAnsibleAllocationOutputDTOs(dtos: AnsibleAllocationOutputDTO[]): string[] {
    return dtos.map(dto => dto.content);
  }

  private static setGeneralAttributes(dto: RequestStageDTO, stage: RequestStage) {
    stage.id = dto.id;
    stage.requestId = dto.id;
    stage.state = this.resolveStageState(dto);
    stage.errorMessage = dto.error_message;

    if (dto.start) {
      stage.start = new Date(dto.start);
    }
    if (dto.end) {
      stage.end = new Date(dto.end);
    }
  }

  private static resolveStageState(dto: RequestStageDTO): RequestStageState {
    if (dto.failed) {
      return RequestStageState.FAILED;
    }
    if ((dto.start === undefined || dto.start === null) && (dto.end === undefined || dto.end === null)) {
      return RequestStageState.IN_QUEUE;
    }
    if (dto.start !== undefined && dto.start !== null && (dto.end === undefined || dto.end === null)) {
      return RequestStageState.RUNNING;
    }
    return RequestStageState.FINISHED;
  }

}
