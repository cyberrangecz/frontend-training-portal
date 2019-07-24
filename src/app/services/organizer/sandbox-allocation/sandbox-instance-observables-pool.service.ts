import {Injectable} from "@angular/core";
import {Dictionary} from 'typescript-collections'
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TrainingInstanceSandboxAllocationState} from "../../../model/training/training-instance-sandbox-allocation-state";
import {shareReplay} from "rxjs/operators";
import {TrainingInstance} from "../../../model/training/training-instance";

@Injectable()
export class SandboxInstanceObservablesPoolService {

  private _sandboxAllocationPool: Dictionary<number, {
    subject: BehaviorSubject<TrainingInstanceSandboxAllocationState>,
    observable: Observable<TrainingInstanceSandboxAllocationState>
  }> = new Dictionary();

  addObservable(trainingInstance: TrainingInstance, initState: TrainingInstanceSandboxAllocationState): Observable<TrainingInstanceSandboxAllocationState> {
    const subject: BehaviorSubject<TrainingInstanceSandboxAllocationState> = new BehaviorSubject(initState);
    const observable: Observable<TrainingInstanceSandboxAllocationState> = subject.asObservable();

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
    console.log('removing' + trainingInstanceId);
    const removed = this._sandboxAllocationPool.remove(trainingInstanceId);
    if (removed) {
      removed.subject.complete();
    }
  }

  getObservable(trainingInstanceId: number): Observable<TrainingInstanceSandboxAllocationState> | undefined {
    const allocation = this._sandboxAllocationPool.getValue(trainingInstanceId);
    return allocation ? allocation.observable : undefined;
  }

  updateState(allocationState: TrainingInstanceSandboxAllocationState) {
    const allocation = this._sandboxAllocationPool.getValue(allocationState.training.id);
    if (allocation) {
      allocation.subject.next(allocationState);
    }
  }
}
