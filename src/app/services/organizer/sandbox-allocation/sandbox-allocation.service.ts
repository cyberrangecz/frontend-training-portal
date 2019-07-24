import {from, interval, Observable, Subject, Subscription, throwError, timer} from 'rxjs';
import {TrainingInstance} from '../../../model/training/training-instance';
import {TrainingInstanceSandboxAllocationState} from '../../../model/training/training-instance-sandbox-allocation-state';
import {SandboxInstance} from '../../../model/sandbox/sandbox-instance';
import {SandboxAllocationState} from '../../../model/enums/sandbox-allocation-state';
import {SandboxInstanceObservablesPoolService} from "./sandbox-instance-observables-pool.service";
import {SandboxInstanceFacade} from "../../facades/sandbox-instance-facade.service";
import {
  catchError,
  concatMap,
  flatMap,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  take,
  takeWhile,
  tap
} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {environment} from '../../../../environments/environment';


@Injectable()
export class SandboxAllocationService {

  private running: boolean = false;

  private runningAllocations: TrainingInstanceSandboxAllocationState[] = [];
  private allocations: TrainingInstanceSandboxAllocationState[] = [];


  /**
   * Subscribe if you want to be notified about every updates in every running allocations.
   * If you care about specific instances use methods to get observable by training instance id
   */
  private instancesStateChangeSubject: Subject<TrainingInstanceSandboxAllocationState[]> = new Subject();
  public instancesStateChange: Observable<TrainingInstanceSandboxAllocationState[]> = this.instancesStateChangeSubject.asObservable();


  /**
   * Subscribe if you want to know general state of all running allocations
   * - Some allocation is running
   * - Some allocation failed
   * - All allocations finished
   */
  private allocationStateChangeSubject: Subject<SandboxAllocationState> = new Subject();
  public allocationStateChange: Observable<SandboxAllocationState> = this.allocationStateChangeSubject.asObservable();

  private periodicalCheckSubscription: Subscription;

  constructor(private sandboxObservablesPool: SandboxInstanceObservablesPoolService,
              private sandboxInstanceFacade: SandboxInstanceFacade) {
  }

  getCurrentStateOfAllocation(): TrainingInstanceSandboxAllocationState[] {
    return this.allocations;
  }

  isRunning(): boolean {
    return this.running;
  }

  dispose() {
    this.running = false;
    if (this.periodicalCheckSubscription) {
      this.periodicalCheckSubscription.unsubscribe();
    }
  }

  getRunningAllocationState(trainingInstance: TrainingInstance): Observable<TrainingInstanceSandboxAllocationState> {
    let allocation$ = this.sandboxObservablesPool.getObservable(trainingInstance.id);
    if (allocation$ === undefined) {
      allocation$ = this.createAllocation(trainingInstance);
    }
    return allocation$.pipe(shareReplay(Number.POSITIVE_INFINITY));
  }

  allocateSandboxes(trainingInstance: TrainingInstance): Observable<TrainingInstanceSandboxAllocationState> {
    return this.initAllocation(trainingInstance)
      .pipe(
        concatMap(allocation => this.createAllocation(trainingInstance)),
        shareReplay(Number.POSITIVE_INFINITY)
      );
  }

  deleteSandbox(trainingInstance: TrainingInstance, sandbox: SandboxInstance, requestedPoolSize: number): Observable<TrainingInstanceSandboxAllocationState>{
    return this.sandboxInstanceFacade.deleteSandbox(trainingInstance.id, sandbox.id)
      .pipe(
        concatMap( deleteResponse => this.createAllocation(trainingInstance, requestedPoolSize)),
        shareReplay(Number.POSITIVE_INFINITY),
      );
  }

  allocateSandbox(trainingInstance: TrainingInstance, requestedPoolSize: number): Observable<TrainingInstanceSandboxAllocationState> {
    return this.sandboxInstanceFacade.allocateSandbox(trainingInstance.id)
      .pipe(
        concatMap( allocationResponse => this.createAllocation(trainingInstance, requestedPoolSize)),
        shareReplay(Number.POSITIVE_INFINITY)
      );
  }

  private emitSandboxStateChange() {
    this.instancesStateChangeSubject.next(this.allocations);
  }

  private emitAllocationStateChange(state: SandboxAllocationState) {
    this.allocationStateChangeSubject.next(state);
  }

  private initAllocation(trainingInstance: TrainingInstance): Observable<any> {
    if (trainingInstance.hasPoolId()) {
      return this.sandboxInstanceFacade.allocateSandboxes(trainingInstance.id);
    } else {
      return this.sandboxInstanceFacade.createPoolAndAllocate(trainingInstance)
        .pipe(tap(poolId => trainingInstance.poolId = poolId));
    }
  }


  private startPeriodicalStateCheck() {
    this.periodicalCheckSubscription = timer(0, environment.sandboxAllocationStateRefreshRate)
      .pipe(
        takeWhile(() => this.running),
        switchMap(() => this.checkStateOfRunningAllocations())
      ).subscribe(
        allocationState => this.updateRunningAllocations(allocationState),
        err => console.error(err)
      );
  }

  private updateRunningAllocations(allocationState: TrainingInstanceSandboxAllocationState) {
    if (allocationState.hasAllocationFinished) {
      this.finishAllocation(allocationState);
    }
    this.emitSandboxStateChange();
  }

  private checkStateOfRunningAllocations(): Observable<TrainingInstanceSandboxAllocationState> {
    const poolIds = this.runningAllocations.map(runningInstanceState => runningInstanceState.training.poolId);
    return from(poolIds)
      .pipe(
        mergeMap(poolId => this.getSandboxesInPoolWithPoolId(poolId)),
        takeWhile(resp => this.getRunningAllocationStateByPoolId(resp.poolId) !== undefined),
        map((resp) => this.updateAllocationState(resp.poolId, resp.sandboxes)),
        tap( (allocationState: TrainingInstanceSandboxAllocationState) => {
            this.sandboxObservablesPool.updateState(allocationState);
            if (allocationState.hasFailedSandboxes) {
              this.emitAllocationStateChange(SandboxAllocationState.FAILED);
            }
        })
      )
  }

  private updateAllocationState(poolId: number, sandboxes): TrainingInstanceSandboxAllocationState {
    const allocationState = this.getRunningAllocationStateByPoolId(poolId);
    allocationState.sandboxes = sandboxes;
    return allocationState;
  }

  private getSandboxesInPoolWithPoolId(poolId: number): Observable<{poolId: number, sandboxes: SandboxInstance[]}> {
    return this.sandboxInstanceFacade.getSandboxesInPool(poolId)
      .pipe(map(sandboxes => {
        return {
          poolId: poolId,
          sandboxes: sandboxes
        }
      }))
  }

  private finishAllocation(trainingAllocationToRemove: TrainingInstanceSandboxAllocationState) {
    const indexToRemove = this.runningAllocations
      .findIndex(trainingAllocation =>
        trainingAllocation.training.id === trainingAllocationToRemove.training.id);
    if (indexToRemove !== -1) {
      this.runningAllocations.splice(indexToRemove);
      this.sandboxObservablesPool.removeObservable(trainingAllocationToRemove.training.id);
      this.checkIfEveryAllocationFinished();
    }
  }

  private checkIfEveryAllocationFinished() {
    this.running = this.runningAllocations.length > 0;
    if (!this.running) {
      this.emitAllocationStateChange(SandboxAllocationState.FINISHED);
    }
  }

  private createAllocation(trainingInstance: TrainingInstance, totalSandboxCount: number = -1): Observable<TrainingInstanceSandboxAllocationState> {
    this.startPeriodicalCheckIfNotRunning();
    this.running = true;
    const initAllocationState = new TrainingInstanceSandboxAllocationState(trainingInstance);
    if (totalSandboxCount !== -1) {
      initAllocationState.requestedPoolSize = totalSandboxCount;
    }
    const state$ = this.sandboxObservablesPool.addObservable(trainingInstance, initAllocationState);
    this.addAllocation(initAllocationState);
    this.emitAllocationStateChange(SandboxAllocationState.RUNNING);
    return state$
  }

  private addAllocation(allocationToAdd: TrainingInstanceSandboxAllocationState) {
    this.addToAllocations(allocationToAdd);
    this.addToRunningAllocations(allocationToAdd);
  }

  private addToAllocations(allocationToAdd: TrainingInstanceSandboxAllocationState) {
    const allocationStateIndex = this.allocations.findIndex(allocation => allocation.training.id === allocationToAdd.training.id);
    if (allocationStateIndex === -1) {
      this.allocations.push(allocationToAdd);
    }
    else {
      this.allocations[allocationStateIndex] = allocationToAdd;
    }
  }

  private addToRunningAllocations(allocationToAdd: TrainingInstanceSandboxAllocationState) {
    const runningAllocationStateIndex = this.runningAllocations.findIndex(allocation => allocation.training.id === allocationToAdd.training.id);
    if (runningAllocationStateIndex === -1) {
      this.runningAllocations.push(allocationToAdd);
    }
    else {
      this.runningAllocations[runningAllocationStateIndex] = allocationToAdd;
    }
  }

  private getRunningAllocationStateByPoolId(poolId: number): TrainingInstanceSandboxAllocationState {
    return this.runningAllocations.find(allocation => allocation.training.poolId === poolId);
  }

  private startPeriodicalCheckIfNotRunning() {
    if (!this.running) {
      this.startPeriodicalStateCheck();
    }
  }
}
