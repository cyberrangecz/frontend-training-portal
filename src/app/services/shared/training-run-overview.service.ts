import {Observable} from 'rxjs';
import {RequestedPagination} from 'kypo2-table';
import {AccessedTrainingRun} from '../../model/table/row/accessed-training-run';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {PaginatedResourceService} from './paginated-resource.service';

export abstract class TrainingRunOverviewService extends PaginatedResourceService {

  abstract trainingRuns$: Observable<PaginatedResource<AccessedTrainingRun[]>>;

  abstract load(pagination?: RequestedPagination): Observable<PaginatedResource<AccessedTrainingRun[]>>;

  abstract resume(id: number): Observable<any>;
}
