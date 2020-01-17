import { Injectable } from '@angular/core';
import {PaginatedResourceService} from '../../shared/paginated-resource.service';
import {Observable} from 'rxjs';
import {TrainingRunTableRow} from '../../../model/table/row/training-run-table-row';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {TrainingInstance} from '../../../model/training/training-instance';

@Injectable()
export abstract class ActiveTrainingRunsService extends PaginatedResourceService {

  abstract activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow>>;

  abstract startPolling(trainingInstance: TrainingInstance);

  abstract getAll(id: number, pagination?: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow>>;

  abstract deleteSandbox(trainingId: number, sandboxId: number): Observable<any>;
}
