import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {Dictionary} from 'typescript-collections';
import {SandboxInstanceAllocationState} from '../../../model/training/sandbox-instance-allocation-state';
import {TrainingInstance} from '../../../model/training/training-instance';

@Injectable()
/**
 * Holds map of sandbox instance allocation observables
 */
export class SandboxInstanceObservablesPoolService {

  private _sandboxAllocationPool: Dictionary<number, {
    subject: BehaviorSubject<SandboxInstanceAllocationState>,
    observable: Observable<SandboxInstanceAllocationState>
  }> = new Dictionary();

  addObservable(trainingInstance: TrainingInstance, initState: SandboxInstanceAllocationState): Observable<SandboxInstanceAllocationState> {
    const subject: BehaviorSubject<SandboxInstanceAllocationState> = new BehaviorSubject(initState);
    const observable: Observable<SandboxInstanceAllocationState> = subject.asObservable();

    if (this.getObservable(trainingInstance.id)) {
      this.removeObservable(trainingInstance.id);
    }

    this._sandboxAllocationPool.setValue(trainingInstance.id,
      {
        subject: subject,
        observable: observable.pipe(shareReplay(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY))
      }
      );
    return observable;
  }

  removeObservable(trainingInstanceId: number) {
    const removed = this._sandboxAllocationPool.remove(trainingInstanceId);
    if (removed) {
      removed.subject.complete();
    }
  }

  getObservable(trainingInstanceId: number): Observable<SandboxInstanceAllocationState> | undefined {
    const allocation = this._sandboxAllocationPool.getValue(trainingInstanceId);
    return allocation ? allocation.observable : undefined;
  }

  updateState(allocationState: SandboxInstanceAllocationState) {
    const allocation = this._sandboxAllocationPool.getValue(allocationState.training.id);
    if (allocation) {
      allocation.subject.next(allocationState);
    }
  }
}
