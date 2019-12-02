import { Injectable } from '@angular/core';
import {ArchivedTrainingRunService} from '../shared/archived-training-run.service';
import {Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingRunTableRow} from '../../model/table-adapters/training-run-table-row';
import {environment} from '../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';

@Injectable()
export abstract class ArchivedTrainingRunPollingService extends ArchivedTrainingRunService {

  protected lastTrainingInstanceId: number;
  protected lastPagination: RequestedPagination;
  protected retryPolling$: Subject<boolean> = new Subject();
  protected delayPolling$: Subject<number> = new Subject();
  protected archivedTrainingRunPoll$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  protected constructor() {
    super();
    this.archivedTrainingRunPoll$ = this.createPoll();
  }

  protected abstract repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>>;

  protected createPoll(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    return timer(environment.organizerSummaryPollingPeriod, environment.organizerSummaryPollingPeriod)
      .pipe(
        switchMap( _ => this.repeatLastGetAllRequest()),
        delayWhen( _ => this.delayPolling$),
        retryWhen(_ => this.retryPolling$)
      );
  }

  protected onManualGetAll(lastTrainingInstanceId: number, pagination: RequestedPagination) {
    this.lastTrainingInstanceId = lastTrainingInstanceId;
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
    this.delayPolling$.next(environment.organizerSummaryPollingPeriod);
  }
}
