import { Injectable } from '@angular/core';
import {ArchivedTrainingRunService} from '../shared/archived-training-run.service';
import {Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {TrainingRunTableRow} from '../../model/table/row/training-run-table-row';
import {environment} from '../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';

@Injectable()
export abstract class ArchivedTrainingRunPollingService extends ArchivedTrainingRunService {


  protected constructor() {
    super();
  }

  protected abstract repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>>;

}
