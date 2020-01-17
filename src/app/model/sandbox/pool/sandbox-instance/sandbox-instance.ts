/**
 * Class representing sandbox instance
 */
import {SandboxInstanceState} from '../../../enums/sandbox-instance-state';

export class SandboxInstance {

  constructor() {
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(value: boolean) {
    this._locked = value;
    this.lockState = value ? 'locked' : 'unlocked';
  }

  id: number;
  poolId: number;
  state: SandboxInstanceState;
  stateLabel: string;
  stateErrorMessage: string;
  lockState: 'locked' | 'unlocked';
  private _locked: boolean;

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

}
