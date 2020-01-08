import {PoolRequestService} from './pool-request.service';
import {Observable, Subject, timer} from 'rxjs';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {environment} from '../../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';

/**
 * Service extending pool request service of polling behaviour
 */
export abstract class PoolRequestPollingService extends PoolRequestService {
  /**
   * Must be set up before polling starts
   */
  protected lastPoolId: number;
  /**
   * @contract must be updated on pagination change
   */
  protected lastPagination: RequestedPagination;
  /**
   * Emission causes polling to start again
   */
  protected retryPolling$: Subject<boolean> = new Subject();
  /**
   * Emission causes delay in polling of emitted time in milis
   */
  protected delayPolling$: Subject<number> = new Subject();
  /**
   * Emits received data with every new poll response
   */
  protected poll$: Observable<PaginatedResource<PoolRequest[]>>;

  protected constructor() {
    super();
    this.poll$ = this.createPoll();
  }

  /**
   * Repeats last recorded request
   */
  protected abstract repeatLastGetAllRequest(): Observable<PaginatedResource<PoolRequest[]>>;

  /**
   * Updates polling info when request is made manually (by changing pagination for example) and delays poll period
   * @param poolId id of a pool associated with requests
   * @param pagination requested pagination
   */
  protected onManualGetAll(poolId: number, pagination: RequestedPagination) {
    this.lastPoolId = poolId;
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
    this.delayPolling$.next(environment.apiPollingPeriod);
  }

  private createPoll(): Observable<PaginatedResource<PoolRequest[]>> {
    return timer(environment.apiPollingPeriod, environment.apiPollingPeriod)
      .pipe(
        switchMap(_ => this.repeatLastGetAllRequest()),
        delayWhen(_ => this.delayPolling$),
        retryWhen(_ => this.retryPolling$),
      );
  }

}
