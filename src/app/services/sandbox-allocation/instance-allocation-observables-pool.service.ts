import {Injectable} from "@angular/core";
import {Dictionary} from 'typescript-collections'
import {Observable, Subject} from "rxjs";
import {TrainingInstanceSandboxAllocationState} from "../../model/training/training-instance-sandbox-allocation-state";
import {shareReplay} from "rxjs/operators";

@Injectable()
export class InstanceAllocationObservablesPoolService {

  private _sandboxAllocationPool: Dictionary<number, {
    subject: Subject<TrainingInstanceSandboxAllocationState>,
    observable: Observable<TrainingInstanceSandboxAllocationState>
  }> = new Dictionary();

  addAllocation(trainingInstanceId: number): Observable<TrainingInstanceSandboxAllocationState> {
    const subject: Subject<TrainingInstanceSandboxAllocationState> = new Subject();
    const observable: Observable<TrainingInstanceSandboxAllocationState> = subject.asObservable();

    if (this.getAllocationObservable(trainingInstanceId)) {
      this.removeAllocation(trainingInstanceId);
    }

    this._sandboxAllocationPool.setValue(trainingInstanceId,
      {
        subject: subject,
        observable: observable.pipe(shareReplay(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY))
      }
      );
    return observable;
  }

  removeAllocation(trainingInstanceId: number) {
    const removed = this._sandboxAllocationPool.remove(trainingInstanceId);
    if (removed) {
      removed.subject.complete();
    }
  }

  getAllocationObservable(trainingInstanceId: number): Observable<TrainingInstanceSandboxAllocationState> | undefined {
    const allocation = this._sandboxAllocationPool.getValue(trainingInstanceId);
    return allocation ? allocation.observable : undefined;
  }

  updateStateOfAllocation(allocationState: TrainingInstanceSandboxAllocationState) {
    const allocation = this._sandboxAllocationPool.getValue(allocationState.training.id);
    if (allocation) {
      allocation.subject.next(allocationState);
    }
  }
}
