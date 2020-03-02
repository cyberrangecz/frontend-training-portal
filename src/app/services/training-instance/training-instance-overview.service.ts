import {PaginatedResourceService} from '../shared/paginated-resource.service';
import {Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingInstance} from '../../model/training/training-instance';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';

export abstract class TrainingInstanceOverviewService extends PaginatedResourceService<TrainingInstance> {

  abstract getAll(pagination: RequestedPagination, filter: string): Observable<PaginatedResource<TrainingInstance>>;

  abstract create(): Observable<any>;

  abstract edit(id: number): Observable<any>;

  abstract archive(id: number): Observable<any>;

  abstract delete(id: number): Observable<any>;

  abstract getPoolState(poolId: number): Observable<string>;
}
