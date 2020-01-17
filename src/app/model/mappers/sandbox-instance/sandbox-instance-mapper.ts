import {SandboxInstanceDTO} from '../../DTOs/sandbox-instance/sandbox-instance-dto';
import {SandboxInstanceState} from '../../enums/sandbox-instance-state';
import {SandboxInstance} from '../../sandbox/pool/sandbox-instance/sandbox-instance';

export class SandboxInstanceMapper {

  static fromDTO(dto: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = dto.id;
    result.poolId = dto.pool;
    result.state = this.getSandboxStateFromString(dto.status);
    result.stateLabel = dto.status.replace(new RegExp('_', 'g'), ' ');
    result.stateErrorMessage = dto.status_reason;
    result.locked = dto.locked;
    return result;
  }

  static fromDTOs(dtos: SandboxInstanceDTO[]): SandboxInstance[] {
    return dtos.map(dto => SandboxInstanceMapper.fromDTO(dto));
  }

  private static getSandboxStateFromString(state: string): SandboxInstanceState {
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
      console.error('UNSUPPORTED STATE OF SANDBOX INSTANCE: ' + state);
      return undefined;
    }
  }
}
