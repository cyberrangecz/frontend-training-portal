import {RequestStageDTO} from '../../DTOs/sandbox-instance/request-stage-dto';
import {RequestStageState} from '../../enums/request-stage-state.enum';
import {AnsibleRunStage} from '../../sandbox/pool/request/stage/ansible-run-stage';
import {OpenStackStage} from '../../sandbox/pool/request/stage/open-stack-stage';
import {RequestStage} from '../../sandbox/pool/request/stage/request-stage';

export class RequestStageMapper {

  static fromDTO(dto: RequestStageDTO): RequestStage {
    let stage: RequestStage;
    if (dto.type === 'ANSIBLE' || dto.type === undefined) {
      stage = new AnsibleRunStage();
    } else if (dto.type === 'OPENSTACK') {
      stage = new OpenStackStage();
    } else {
      console.error(`${dto.type} does not match supported RequestStage types`);
    }
    stage.id = dto.id;
    stage.state = this.resolveStageState(dto);
    stage.errorMessage = dto.error_message;

    if (dto.start) {
      stage.start = new Date(dto.start);
    }
    if (dto.end) {
      stage.end = new Date(dto.end);
    }

    // stage.jobId = stageDTO.job_id;
    // stage.description = stageDTO.description;
    // stage.percentFinished = stageDTO.percent;
    // stage.state = RequestStageState[stageDTO.state];
    return stage;
  }

  static fromDTOs(dtos: RequestStageDTO[]): RequestStage[] {
    return dtos.map(dto => RequestStageMapper.fromDTO(dto));
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
