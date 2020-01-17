import {PaginatedResourceService} from '../shared/paginated-resource.service';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingInstance} from '../../model/training/training-instance';
import {RequestedPagination} from 'kypo2-table';

export abstract class TrainingInstanceOverviewService extends PaginatedResourceService {
  abstract trainingInstances$: Observable<PaginatedResource<TrainingInstance>>;

  abstract getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingInstance>>;

  abstract archive(id: number): Observable<any>;

  abstract delete(id: number): Observable<any>;

  abstract getPoolState(poolId: number): Observable<string>;
}
