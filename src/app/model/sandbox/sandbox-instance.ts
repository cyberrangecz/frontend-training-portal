/**
 * Class representing sandbox instance of a definition
 */
import {SandboxInstanceState} from '../enums/sandbox-instance-state';

export class SandboxInstance {
  id: number;
  poolId: number;
  state: SandboxInstanceState;
  stateLabel: string;
  stateErrorMessage: string;

  constructor() {
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
