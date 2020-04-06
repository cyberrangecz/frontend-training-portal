import {KypoPaginatedResourceService} from 'kypo-common';
import {Observable} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {TrainingInstance} from 'kypo-training-model';
import {KypoRequestedPagination} from 'kypo-common';

export abstract class TrainingInstanceOverviewService extends KypoPaginatedResourceService<TrainingInstance> {

  abstract getAll(pagination: KypoRequestedPagination, filter: string): Observable<KypoPaginatedResource<TrainingInstance>>;

  abstract create(): Observable<any>;

  abstract edit(id: number): Observable<any>;

  abstract download(id: number): Observable<any>;

  abstract delete(id: number): Observable<any>;

  abstract getPoolState(poolId: number): Observable<string>;
}
