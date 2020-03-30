import {TrainingInstance} from '../../../model/training/training-instance';
import {Pool} from 'kypo-sandbox-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {KypoPaginatedResource, KypoPaginatedResourceService, KypoRequestedPagination} from 'kypo-common';

export abstract class PoolAssignService extends KypoPaginatedResourceService<Pool> {

  protected selectedSubject$: BehaviorSubject<Pool> = new BehaviorSubject(undefined);
  selected$: Observable<Pool> = this.selectedSubject$.asObservable();

  protected assignedPoolSubject$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  assignedPool$: Observable<number> = this.assignedPoolSubject$.asObservable();

  abstract init(trainingInstance: TrainingInstance);

  abstract getAll(requestedPagination: KypoRequestedPagination): Observable<KypoPaginatedResource<Pool>>;

  abstract assign(trainingInstance: TrainingInstance): Observable<any>;

  abstract unassign(trainingInstance: TrainingInstance): Observable<any>

  select(selected: Pool) {
    this.selectedSubject$.next(selected);
  }

  unselect() {
    this.selectedSubject$.next(undefined);
  }
}
