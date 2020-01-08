import {Injectable} from '@angular/core';
import {RequestedPagination} from 'kypo2-table';
import {from, Observable, Subject, Subscription, timer} from 'rxjs';
import {ShareReplayConfig} from 'rxjs/internal-compatibility';
import {
  concatMap,
  map,
  mergeMap, retry,
  shareReplay,
  switchMap,
  takeWhile,
  tap
} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {SandboxAllocationState} from '../../../model/enums/sandbox-allocation-state';
import {SandboxInstanceAllocationState} from '../../../model/training/sandbox-instance-allocation-state';
import {TrainingInstance} from '../../../model/training/training-instance';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {SandboxInstanceObservablesPoolService} from './sandbox-instance-observables-pool.service';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';


@Injectable()
/**
 * Service adding new sandbox instance actions (allocate or delete) and periodically refreshing its state.
 * Automatically ends polling if all allocations are finished.
 */
export class SandboxAllocationService {

  private running = false;

  private cacheConfig: ShareReplayConfig = { refCount: true, windowTime: environment.apiPollingPeriod };
  private runningAllocations: SandboxInstanceAllocationState[] = [];
  private allocations: SandboxInstanceAllocationState[] = [];


  /**
   * Subscribe if you want to be notified about every updates in every running allocations.
   * If you care about specific instances use methods to get observable by training instance id
   */
  private instancesStateChangeSubject: Subject<SandboxInstanceAllocationState[]> = new Subject();
  public instancesStateChange: Observable<SandboxInstanceAllocationState[]> = this.instancesStateChangeSubject.asObservable();


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
              private sandboxInstanceFacade: SandboxInstanceApi) {
  }

  getCurrentStateOfAllocation(): SandboxInstanceAllocationState[] {
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

  getRunningAllocationState(trainingInstance: TrainingInstance): Observable<SandboxInstanceAllocationState> {
    const count = 3;
    let allocation$ = this.sandboxObservablesPool.getObservable(trainingInstance.id);
    if (allocation$ === undefined) {
      allocation$ = this.createAllocation(trainingInstance).pipe(retry(count));
    }
    return allocation$.pipe(shareReplay(this.cacheConfig));
  }

  allocateSandboxes(trainingInstance: TrainingInstance, count: number = 0): Observable<SandboxInstanceAllocationState> {
    return this.sandboxInstanceFacade.allocateSandboxByTrainingInstance(trainingInstance.id, count)
      .pipe(
        concatMap(allocation => this.createAllocation(trainingInstance, count)),
        shareReplay(this.cacheConfig)
      );
  }

  deleteSandbox(trainingInstance: TrainingInstance,
                sandbox: SandboxInstance,
                requestedPoolSize: number,
                isHardDelete: boolean): Observable<SandboxInstanceAllocationState> {
    return this.sandboxInstanceFacade.deleteByTrainingInstance(trainingInstance.id, sandbox.id, isHardDelete)
      .pipe(
        concatMap( deleteResponse => this.createAllocation(trainingInstance, requestedPoolSize)),
        shareReplay(this.cacheConfig),
      );
  }

  allocateSandbox(trainingInstance: TrainingInstance, requestedPoolSize: number): Observable<SandboxInstanceAllocationState> {
    return this.sandboxInstanceFacade.allocateSandboxByTrainingInstance(trainingInstance.id)
      .pipe(
        concatMap( allocationResponse => this.createAllocation(trainingInstance, requestedPoolSize)),
        shareReplay(this.cacheConfig)
      );
  }

  private emitSandboxStateChange() {
    this.instancesStateChangeSubject.next(this.allocations);
  }

  private emitAllocationStateChange(state: SandboxAllocationState) {
    this.allocationStateChangeSubject.next(state);
  }

  private startPeriodicalStateCheck() {
    this.periodicalCheckSubscription = timer(0, environment.apiPollingPeriod)
      .pipe(
        takeWhile(() => this.running),
        switchMap(() => this.checkStateOfRunningAllocations())
      ).subscribe(
        allocationState => this.updateRunningAllocations(allocationState),
        err => console.error(err)
      );
  }

  private updateRunningAllocations(allocationState: SandboxInstanceAllocationState) {
    if (allocationState.hasAllocationFinished) {
      this.finishAllocation(allocationState);
    }
    this.emitSandboxStateChange();
  }

  private checkStateOfRunningAllocations(): Observable<SandboxInstanceAllocationState> {
    const pools: {id: number, maxSize: number}[] = this.runningAllocations.map(runningInstanceState => {
      return {
        id: runningInstanceState.training.poolId,
        maxSize: runningInstanceState.training.poolSize
      };
    });
    return from(pools)
      .pipe(
        mergeMap(pool => this.getSandboxesInPoolWithPoolId(pool.id, pool.maxSize)),
        takeWhile(resp => this.getRunningAllocationStateByPoolId(resp.poolId) !== undefined),
        map((resp) => this.updateAllocationState(resp.poolId, resp.sandboxes)),
        tap( (allocationState: SandboxInstanceAllocationState) => {
          this.sandboxObservablesPool.updateState(allocationState);
          if (allocationState.hasFailedSandboxes) {
            this.emitAllocationStateChange(SandboxAllocationState.FAILED);
          }
        })
      );
  }

  private updateAllocationState(poolId: number, sandboxes): SandboxInstanceAllocationState {
    const allocationState = this.getRunningAllocationStateByPoolId(poolId);
    allocationState.sandboxes = sandboxes;
    return allocationState;
  }

  private getSandboxesInPoolWithPoolId(poolId: number, poolSize): Observable<{poolId: number, sandboxes: SandboxInstance[]}> {
    return this.sandboxInstanceFacade.getSandboxes(poolId, new RequestedPagination(0, poolSize, '', ''))
      .pipe(map(response => {
        return {
          poolId: poolId,
          sandboxes: response.elements
        };
      }));
  }

  private finishAllocation(trainingAllocationToRemove: SandboxInstanceAllocationState) {
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

  private createAllocation(trainingInstance: TrainingInstance, totalSandboxCount: number = -1): Observable<SandboxInstanceAllocationState> {
    this.startPeriodicalCheckIfNotRunning();
    this.running = true;
    const initAllocationState = new SandboxInstanceAllocationState(trainingInstance);
    if (totalSandboxCount !== -1) {
      initAllocationState.requestedPoolSize = totalSandboxCount;
    }
    const state$ = this.sandboxObservablesPool.addObservable(trainingInstance, initAllocationState);
    this.addAllocation(initAllocationState);
    this.emitAllocationStateChange(SandboxAllocationState.RUNNING);
    return state$;
  }

  private addAllocation(allocationToAdd: SandboxInstanceAllocationState) {
    this.addToAllocations(allocationToAdd);
    this.addToRunningAllocations(allocationToAdd);
  }

  private addToAllocations(allocationToAdd: SandboxInstanceAllocationState) {
    const allocationStateIndex = this.allocations.findIndex(allocation => allocation.training.id === allocationToAdd.training.id);
    if (allocationStateIndex === -1) {
      this.allocations.push(allocationToAdd);
    } else {
      this.allocations[allocationStateIndex] = allocationToAdd;
    }
  }

  private addToRunningAllocations(allocationToAdd: SandboxInstanceAllocationState) {
    const runningAllocationStateIndex = this.runningAllocations.findIndex(
      allocation => allocation.training.id === allocationToAdd.training.id
    );
    if (runningAllocationStateIndex === -1) {
      this.runningAllocations.push(allocationToAdd);
    } else {
      this.runningAllocations[runningAllocationStateIndex] = allocationToAdd;
    }
  }

  private getRunningAllocationStateByPoolId(poolId: number): SandboxInstanceAllocationState {
    return this.runningAllocations.find(allocation => allocation.training.poolId === poolId);
  }

  private startPeriodicalCheckIfNotRunning() {
    if (!this.running) {
      this.startPeriodicalStateCheck();
    }
  }
}
