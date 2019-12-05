import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {PaginatedResourceService} from './paginated-resource.service';
import {TrainingInstance} from '../../model/training/training-instance';

@Injectable()
export abstract class ArchivedTrainingRunService extends PaginatedResourceService {

  abstract startPolling(trainingInstance: TrainingInstance);

  abstract archivedTrainingRuns$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  abstract getAll(trainingInstanceId: number, pagination?: RequestedPagination): Observable<PaginatedResource<TrainingRunTableRow[]>>;

  abstract delete(id: number): Observable<any>;

  abstract deleteMultiple(idsToDelete: number[]): Observable<any>;

}
