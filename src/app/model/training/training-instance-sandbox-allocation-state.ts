import {TrainingInstance} from './training-instance';
import {SandboxInstance} from '../sandbox/sandbox-instance';
import {Observable, Subject} from "rxjs";

export class TrainingInstanceSandboxAllocationState {
  training: TrainingInstance;
  requestedPoolSize: number;
  hasAllocationFinished;
  hasFailedSandboxes = false;
  isInProgress = false;
  wasUpdated = false;
  allocatedCount = 0;
  failedCount = 0;

  private attemptsUntilStopped = 3;
  private _sandboxes: SandboxInstance[];

  constructor(training: TrainingInstance) {
    this.training = training;
    this.requestedPoolSize = training.poolSize;
    this._sandboxes = [];
  }

  get sandboxes(): SandboxInstance[] {
    return this._sandboxes;
  }

  set sandboxes(value: SandboxInstance[]) {
    if (value.length === 0 || !value.some(sandbox => sandbox.isInProgress())) {
      this.attemptsUntilStopped--;
    }
    this._sandboxes = value;
    this.updateHasAllocationFinished();
    this.update();
  }

  private update() {
    this.wasUpdated = true;
    this.updateHasFailedSandboxes();
    this.updateFailed();
    this.updateAllocated();
    this.updateIsInProgress();
  }

  private updateHasAllocationFinished() {
    if (this.attemptsUntilStopped > 0) {
      this.hasAllocationFinished = false;
    } else {
      this.hasAllocationFinished = this._sandboxes.every(sandbox => sandbox.isCreated() || sandbox.isFailed());
      if (this.hasAllocationFinished) {
        this.update();
      }
    }
  }

  private updateHasFailedSandboxes() {
    if (this._sandboxes.length === 0) {
      this.hasFailedSandboxes = false;
    } else {
      this.hasFailedSandboxes = this._sandboxes.some(sandbox => sandbox.isFailed());
    }
  }

  private updateAllocated() {
    this.allocatedCount = this._sandboxes.filter(sandbox => sandbox.isCreated()).length
  }

  private updateFailed() {
    this.failedCount = this._sandboxes.filter(sandbox => sandbox.isFailed()).length
  }

  private updateIsInProgress() {
    if (this._sandboxes.length === 0) {
      this.isInProgress = false;
    } else {
      this.isInProgress = this._sandboxes.some(sandbox => sandbox.isInProgress())
    }
  }
}
