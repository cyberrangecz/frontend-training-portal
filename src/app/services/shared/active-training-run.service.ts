import { Injectable } from '@angular/core';
import {PaginatedResourceService} from './paginated-resource.service';
import {Observable} from 'rxjs';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {TrainingInstance} from '../../model/training/training-instance';

@Injectable()
export abstract class ActiveTrainingRunService extends PaginatedResourceService {
  abstract trainingInstance: TrainingInstance;

  abstract activeTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  abstract getAll(id: number, pagination?: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>>;

  abstract deleteSandbox(trainingId: number, sandboxId: number): Observable<any>
}
