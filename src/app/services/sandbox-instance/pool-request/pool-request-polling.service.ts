import {PoolRequestService} from './pool-request.service';
import {Observable, Subject, timer} from 'rxjs';
import {KypoPaginatedResource} from 'kypo-common';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {environment} from '../../../../environments/environment';
import {delayWhen, retryWhen, switchMap} from 'rxjs/operators';
import {KypoRequestedPagination} from 'kypo-common';

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
  protected lastPagination: KypoRequestedPagination;
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
  protected poll$: Observable<KypoPaginatedResource<PoolRequest>>;

  protected constructor() {
    super(environment.defaultPaginationSize);
    this.poll$ = this.createPoll();
  }

  /**
   * Repeats last recorded request
   */
  protected abstract repeatLastGetAllRequest(): Observable<KypoPaginatedResource<PoolRequest>>;

  /**
   * Updates polling info when request is made manually (by changing pagination for example) and delays poll period
   * @param poolId id of a pool associated with requests
   * @param pagination requested pagination
   */
  protected onManualGetAll(poolId: number, pagination: KypoRequestedPagination) {
    this.lastPoolId = poolId;
    this.lastPagination = pagination;
    if (this.hasErrorSubject$.getValue()) {
      this.retryPolling$.next(true);
    }
    this.hasErrorSubject$.next(false);
    this.delayPolling$.next(environment.apiPollingPeriod);
  }

  private createPoll(): Observable<KypoPaginatedResource<PoolRequest>> {
    return timer(environment.apiPollingPeriod, environment.apiPollingPeriod)
      .pipe(
        switchMap(_ => this.repeatLastGetAllRequest()),
        delayWhen(_ => this.delayPolling$),
        retryWhen(_ => this.retryPolling$),
      );
  }

}
