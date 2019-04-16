import {TrainingInstance} from './training-instance';
import {SandboxInstance} from '../sandbox/sandbox-instance';
import {Observable, Subject} from "rxjs";

export class TrainingInstanceSandboxAllocationState {
  training: TrainingInstance;
  sandboxes: SandboxInstance[];
  requestedPoolSize: number;

  constructor(training: TrainingInstance) {
    this.training = training;
    this.requestedPoolSize = training.poolSize;
    this.sandboxes = [];
  }

  hasAllocationFinished(): boolean {
    if (this.sandboxes.length !== this.requestedPoolSize) {
      return false;
    }
    return this.sandboxes.every(sandbox => sandbox.isCreated() || sandbox.isFailed());
  }

  hasFailedSandboxes(): boolean {
    return this.sandboxes.some(sandbox => sandbox.isFailed());
  }

  getSuccessfullyCreatedSandboxesCount(): number {
    let result = 0;
    this.sandboxes.forEach(sandbox => {
      if (sandbox.isCreated()) {
        result += 1;
      }
    });
    return result;
  }

  getFailedSandboxesCount(): number {
    let result = 0;
    this.sandboxes.forEach(sandbox => {
      if (sandbox.isFailed()) {
        result += 1;
      }
    });
    return result;
  }
}
