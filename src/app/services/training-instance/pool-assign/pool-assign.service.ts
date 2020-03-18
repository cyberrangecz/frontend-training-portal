import {TrainingInstance} from '../../../model/training/training-instance';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {BehaviorSubject, Observable} from 'rxjs';
import {KypoPaginatedResource, KypoPaginatedResourceService, KypoRequestedPagination} from 'kypo-common';

export abstract class PoolAssignService extends KypoPaginatedResourceService<SandboxPool> {

  protected selectedSubject$: BehaviorSubject<SandboxPool> = new BehaviorSubject(undefined);
  selected$: Observable<SandboxPool> = this.selectedSubject$.asObservable();

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  abstract init(trainingInstance: TrainingInstance);

  abstract getAll(requestedPagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxPool>>;

  abstract assign(trainingInstance: TrainingInstance): Observable<any>;

  abstract unassign(trainingInstance: TrainingInstance): Observable<any>

  select(selected: SandboxPool) {
    this.selectedSubject$.next(selected);
  }

  unselect() {
    this.selectedSubject$.next(undefined);
  }
}
