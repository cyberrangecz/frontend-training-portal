/**
 * Class representing sandbox instance of a definition
 */
import {SandboxInstanceState} from '../../enums/sandbox-instance-state';

export class SandboxInstance {
  id: number;
  poolId: number;
  state: SandboxInstanceState;

  constructor() {
  }

  isCreated(): boolean {
    return this.state === SandboxInstanceState.CREATE_COMPLETE;
  }

  isFailed(): boolean {
    return this.state === SandboxInstanceState.ADOPT_FAILED
      || this.state === SandboxInstanceState.CHECK_FAILED
      || this.state === SandboxInstanceState.CREATE_FAILED
      || this.state === SandboxInstanceState.DELETE_FAILED
      || this.state === SandboxInstanceState.RESTORE_FAILED
      || this.state === SandboxInstanceState.RESUME_FAILED
      || this.state === SandboxInstanceState.ROLLBACK_FAILED
      || this.state === SandboxInstanceState.SNAPSHOT_FAILED
      || this.state === SandboxInstanceState.SUSPEND_FAILED
      || this.state === SandboxInstanceState.UPDATE_FAILED;
  }

  isInProgress(): boolean {
    return this.state === SandboxInstanceState.ADOPT_IN_PROGRESS
      || this.state === SandboxInstanceState.CHECK_IN_PROGRESS
      || this.state === SandboxInstanceState.CREATE_IN_PROGRESS
      || this.state === SandboxInstanceState.DELETE_IN_PROGRESS
      || this.state === SandboxInstanceState.RESTORE_IN_PROGRESS
      || this.state === SandboxInstanceState.RESUME_IN_PROGRESS
      || this.state === SandboxInstanceState.ROLLBACK_IN_PROGRESS
      || this.state === SandboxInstanceState.SNAPSHOT_IN_PROGRESS
      || this.state === SandboxInstanceState.SUSPEND_IN_PROGRESS
      || this.state === SandboxInstanceState.UPDATE_IN_PROGRESS;
  }
}
