import {interval, Observable, Subject, Subscription} from "rxjs";
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceSandboxAllocationState} from '../../../model/training/training-instance-sandbox-allocation-state';
import {SandboxInstance} from '../../../model/sandbox/sandbox-instance';
import {SandboxAllocationState} from '../../../model/enums/sandbox-allocation-state';
import {InstanceAllocationObservablesPoolService} from "./instance-allocation-observables-pool.service";
import {SandboxInstanceFacade} from "../../facades/sandbox-instance-facade.service";
import {flatMap, map, shareReplay} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {SandboxAllocationBarService} from "./sandbox-allocation-bar.service";


@Injectable()
export class SandboxAllocationService {

  private _isRunning: boolean = false;

  private _runningTrainingInstances: TrainingInstanceSandboxAllocationState[] = [];
  private _trainingInstances: TrainingInstanceSandboxAllocationState[] = [];


  /**
   * Subscribe if you want to be notified about every updates in every running allocations.
   * If you care about specified use methods to get observable by training instance id
   */
  private _instancesStateChangeSubject: Subject<TrainingInstanceSandboxAllocationState[]> = new Subject();
  public instancesStateChange: Observable<TrainingInstanceSandboxAllocationState[]> = this._instancesStateChangeSubject.asObservable();


  /**
   * Subscribe if you want to know general state of all running allocations
   * - Some allocation is running
   * - Some allocation failed
   * - All allocations finished
   */
  private _allocationStateChangeSubject: Subject<SandboxAllocationState> = new Subject();
  public allocationStateChange: Observable<SandboxAllocationState> = this._allocationStateChangeSubject.asObservable();

  private _periodicalCheckSubscription: Subscription;

  constructor(private sandboxAllocationPoolService: InstanceAllocationObservablesPoolService,
              private sandboxAllocationBarService: SandboxAllocationBarService,
              private sandboxInstanceFacade: SandboxInstanceFacade) {
  }

  getCurrentStateOfAllocation(): TrainingInstanceSandboxAllocationState[] {
    return this._trainingInstances;
  }

  getRunningAllocationStateObservable(trainingInstance: TrainingInstance): Observable<TrainingInstanceSandboxAllocationState> {
    return this.sandboxAllocationPoolService.getAllocationObservable(trainingInstance.id);
  }

  allocateSandboxes(trainingInstance: TrainingInstance): Observable<TrainingInstanceSandboxAllocationState> {
    let allocationRequest: Observable<any>;
    if (trainingInstance.hasPoolId()) {
      allocationRequest = this.sandboxInstanceFacade.allocateSandboxes(trainingInstance.id);
    } else {
      allocationRequest = this.createPoolAndAllocate(trainingInstance);
    }
    return allocationRequest
      .pipe(
        flatMap(allocationResponse => {
        this.onAllocationRequestSuccessful(trainingInstance);
        return this.sandboxAllocationPoolService.addAllocation(trainingInstance.id)
        }),
        shareReplay(Number.POSITIVE_INFINITY),
      );
  }


  deleteSandbox(trainingInstance: TrainingInstance, sandbox: SandboxInstance, requestedPoolSize: number): Observable<TrainingInstanceSandboxAllocationState>{
    return this.sandboxInstanceFacade.deleteSandbox(trainingInstance.id, sandbox.id)
      .pipe(
        flatMap( deleteResponse => {
        this.onDeleteRequestSuccessful(trainingInstance, requestedPoolSize);
        return this.sandboxAllocationPoolService.addAllocation(trainingInstance.id)
      }));
  }

  allocateSandbox(trainingInstance: TrainingInstance, requestedPoolSize: number): Observable<TrainingInstanceSandboxAllocationState> {
    return this.sandboxInstanceFacade.allocateSandbox(trainingInstance.id)
      .pipe(
        flatMap( allocationResponse => {
          this.onAllocationRequestSuccessful(trainingInstance, requestedPoolSize);
          return this.sandboxAllocationPoolService.addAllocation(trainingInstance.id)
      }));
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  dispose() {
    if (this._periodicalCheckSubscription) {
      this._periodicalCheckSubscription.unsubscribe();
    }
  }

  private emitSandboxStateChange() {
    this._instancesStateChangeSubject.next(this._trainingInstances);
  }

  private emitAllocationStateChange(state: SandboxAllocationState) {
    this._allocationStateChangeSubject.next(state);
  }

  private startPeriodicalStateCheck() {
    const periodicalCheck = interval(5000)
      .pipe(map(() => this.checkStateOfRunningAllocations()));

    periodicalCheck.subscribe(responses => // TODO: Combine to one result and subscribe just once
      responses.forEach(response =>
        response.subscribe(runningAllocationState => {
          if (runningAllocationState.hasAllocationFinished()) {
            this.finishAllocation(runningAllocationState);
          }
          this.emitSandboxStateChange()
        })
      )
    );
  }

  private checkStateOfRunningAllocations(): Observable<TrainingInstanceSandboxAllocationState>[] {
    return this._runningTrainingInstances.map(runningInstanceState =>
      this.sandboxInstanceFacade.getSandboxesInPool(runningInstanceState.training.poolId)
        .pipe(
          map(sandboxes => {
            runningInstanceState.sandboxes = sandboxes;
            this.sandboxAllocationPoolService.updateStateOfAllocation(runningInstanceState);
            if (runningInstanceState.hasFailedSandboxes()) {
              this.emitAllocationStateChange(SandboxAllocationState.FAILED);
            }
            return runningInstanceState;
          }),
        )
    )
  }

  private finishAllocation(trainingAllocationToRemove: TrainingInstanceSandboxAllocationState) {
    const indexToRemove = this._runningTrainingInstances
      .findIndex(trainingAllocation =>
        trainingAllocation.training.id === trainingAllocationToRemove.training.id);
    if (indexToRemove !== -1) {
      this._runningTrainingInstances.splice(indexToRemove);
      this.sandboxAllocationPoolService.removeAllocation(trainingAllocationToRemove.training.id);
      this.checkIfFinished();
    }
  }

  private checkIfFinished() {
    this._isRunning = this._runningTrainingInstances.length > 0;
    if (!this._isRunning) {
      this.emitAllocationStateChange(SandboxAllocationState.FINISHED);
    }
  }

  private createPoolAndAllocate(trainingInstance: TrainingInstance): Observable<any> {
    return this.sandboxInstanceFacade.createPool(trainingInstance.id)
      .pipe(flatMap(poolId => {
        trainingInstance.poolId = poolId;
        return this.sandboxInstanceFacade.allocateSandboxes(trainingInstance.id);
      }))
  }

  private onAllocationRequestSuccessful(trainingInstance: TrainingInstance, totalSandboxCount: number = -1) {
    this.startPeriodicalCheckIfNotRunning();
    this._isRunning = true;
    const sandboxAllocation = new TrainingInstanceSandboxAllocationState(trainingInstance);
    if (totalSandboxCount !== -1) {
      sandboxAllocation.requestedPoolSize = totalSandboxCount;
    }
    this.addAllocation(sandboxAllocation);
    //this.sandboxAllocationBarService.open(); TODO fix
    this.emitAllocationStateChange(SandboxAllocationState.RUNNING);
  }

  private onDeleteRequestSuccessful(trainingInstance: TrainingInstance, totalSandboxCount: number) {
    this.startPeriodicalCheckIfNotRunning();
    this._isRunning = true;
    const sandboxAllocation = new TrainingInstanceSandboxAllocationState(trainingInstance);
    sandboxAllocation.requestedPoolSize = totalSandboxCount;
    this.addAllocation(sandboxAllocation);
    //this.sandboxAllocationBarService.open(); TODO fix
    this.emitAllocationStateChange(SandboxAllocationState.RUNNING);
  }

  private addAllocation(allocationToAdd: TrainingInstanceSandboxAllocationState) {
    const allocationStateIndex = this._trainingInstances.findIndex(allocation => allocation.training.id === allocationToAdd.training.id);
    if (allocationStateIndex === -1) {
      this._trainingInstances.push(allocationToAdd);
    }
    else {
      this._trainingInstances[allocationStateIndex] = allocationToAdd;
    }

    const runningAllocationStateIndex = this._runningTrainingInstances.findIndex(allocation => allocation.training.id === allocationToAdd.training.id);
    if (runningAllocationStateIndex === -1) {
      this._runningTrainingInstances.push(allocationToAdd);
    }
    else {
      this._runningTrainingInstances[runningAllocationStateIndex] = allocationToAdd;
    }
  }

  private startPeriodicalCheckIfNotRunning() {
    if (!this._isRunning) {
      this.startPeriodicalStateCheck();
    }
  }
}
