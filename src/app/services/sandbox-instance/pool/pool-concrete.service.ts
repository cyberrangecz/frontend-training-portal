import {Injectable} from '@angular/core';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../../model/table/other/paginated-resource';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {PoolService} from './pool.service';
import {environment} from '../../../../environments/environment';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';

/**
 * Emission causes cached data to cleanup
 */
const cacheBuster$: Subject<void> = new Subject();

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get pools and perform various operations to modify them.
 */
@Injectable()
export class PoolConcreteService extends PoolService {
  private lastPagination: RequestedPagination;
  private poolsSubject: BehaviorSubject<PaginatedResource<SandboxPool[]>> = new BehaviorSubject(this.initSubject());

  /**
   * List of pools with currently selected pagination options
   */
  pools$: Observable<PaginatedResource<SandboxPool[]>> = this.poolsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceApi,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets all pools with passed pagination and updates related observables or handles an error
   * @param pagination requested pagination
   */
  @Cacheable({
    cacheBusterObserver: cacheBuster$
  })
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>> {
    this.lastPagination = pagination;
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getPools(pagination)
      .pipe(
        tap(
          paginatedPools => {
            this.poolsSubject.next(paginatedPools);
            this.totalLengthSubject$.next(paginatedPools.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching pools');
            this.hasErrorSubject$.next(true);
          }
        ),
      );
  }

  /**
   * Starts a sandbox instance allocation, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be allocated with sandbox instances
   * @param count number of sandbox instances to be allocated
   */
  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  allocate(pool: SandboxPool, count: number = -1): Observable<any> {
    let allocation$: Observable<any>;
    if (count <= 0) {
      allocation$ = this.sandboxInstanceFacade.allocate(pool.id);
    } else {
      allocation$ = this.sandboxInstanceFacade.allocate(pool.id, count);
    }
    return allocation$
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Allocation started'),
          err => this.errorHandler.display(err, 'Allocating sandboxes')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Deletes a pool, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be deleted
   */
  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  delete(pool: SandboxPool): Observable<any> {
    return this.sandboxInstanceFacade.deletePool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool was successfully deleted'),
            err => this.errorHandler.display(err, 'Deleting pool')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Clears a pool by deleting all associated sandbox instances, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be cleared
   */
  @CacheBuster({
    cacheBusterNotifier: cacheBuster$
  })
  clear(pool: SandboxPool): Observable<any> {
    return this.sandboxInstanceFacade.clearPool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool was successfully cleared'),
          err => this.errorHandler.display(err, 'Clear pool')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  private initSubject(): PaginatedResource<SandboxPool[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
