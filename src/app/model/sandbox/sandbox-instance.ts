/**
 * Class representing sandbox instance of a definition
 */
import {SandboxInstanceState} from '../enums/sandbox-instance-state';
import {SandboxInstanceDTO} from '../DTOs/sandbox-instance/sandbox-instance-dto';

export class SandboxInstance {
  id: number;
  poolId: number;
  state: SandboxInstanceState;
  stateLabel: string;
  stateErrorMessage: string;

  constructor() {
  }

  static fromDTO(sandboxInstanceDTO: SandboxInstanceDTO): SandboxInstance {
    const result = new SandboxInstance();
    result.id = sandboxInstanceDTO.id;
    result.poolId = sandboxInstanceDTO.pool;
    result.state = SandboxInstance.getSandboxStateFromString(sandboxInstanceDTO.status);
    result.stateLabel = sandboxInstanceDTO.status.replace(new RegExp('_', 'g'), ' ');
    result.stateErrorMessage = sandboxInstanceDTO.status_reason;
    return result;
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
      return undefined;
    }
  }

  isCreated(): boolean {
    return this.state === SandboxInstanceState.COMPLETE;
  }

  isFailed(): boolean {
    return this.state === SandboxInstanceState.FAILED;
  }

  isInProgress(): boolean {
    return this.state === SandboxInstanceState.IN_PROGRESS
      || this.state === SandboxInstanceState.DELETE_IN_PROGRESS;
  }

  isBeingDeleted(): boolean {
    return this.state === SandboxInstanceState.DELETE_IN_PROGRESS;
  }

  isDeleteFailed(): boolean {
    return this.state === SandboxInstanceState.DELETE_FAILED;
  }
}
