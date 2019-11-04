import { Injectable } from '@angular/core';
import {FetchActiveTrainingRunService} from '../shared/fetch-active-training-run.service';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {TrainingRunTableRow} from '../../model/table-adapters/training-run-table-row';
import {environment} from '../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';

@Injectable()
export abstract class FetchActiveTrainingRunPollingService extends FetchActiveTrainingRunService {

  protected lastTrainingInstanceId: number;
  protected lastPagination: RequestedPagination;
  protected retryPolling$: Subject<boolean> = new Subject();
  protected delayPolling$: Subject<number> = new Subject();
  protected activeTrainingRunPoll$: Observable<PaginatedResource<TrainingRunTableRow[]>>;

  protected constructor() {
    super();
    this.activeTrainingRunPoll$ = this.createPoll();
  }

  protected abstract repeatLastGetAllRequest(): Observable<PaginatedResource<TrainingRunTableRow[]>>;

  protected createPoll(): Observable<PaginatedResource<TrainingRunTableRow[]>> {
    return timer(environment.defaultOrganizerTROverviewRefreshRate, environment.defaultOrganizerTROverviewRefreshRate)
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
    this.delayPolling$.next(environment.defaultOrganizerTROverviewRefreshRate);
  }
}
