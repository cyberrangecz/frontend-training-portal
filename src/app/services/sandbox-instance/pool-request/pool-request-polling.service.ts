import {PoolRequestService} from './pool-request.service';
import {Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {environment} from '../../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';

export abstract class PoolRequestPollingService extends PoolRequestService {
  protected lastPoolId: number;
  protected lastPagination: RequestedPagination;
  protected retryPolling$: Subject<boolean> = new Subject();
  protected delayPolling$: Subject<number> = new Subject();
  protected poll$: Observable<PaginatedResource<PoolRequest[]>>;

  protected constructor() {
    super();
    this.poll$ = this.createPoll();
  }

  protected abstract repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest[]>>;

  protected createPoll(): Observable<PaginatedResource<PoolRequest[]>> {
    return timer(environment.apiPollingPeriod, environment.apiPollingPeriod)
      .pipe(
        switchMap(_ => this.repeatLastGetAllRequest()),
        delayWhen(_ => this.delayPolling$),
        retryWhen(_ => this.retryPolling$),
      );
  }

  protected onManualGetAll(poolId: number, pagination: RequestedPagination) {
    this.lastPoolId = poolId;
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
    this.delayPolling$.next(environment.apiPollingPeriod);
  }
}
