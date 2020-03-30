import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Pool} from 'kypo-sandbox-model';
import {KypoPaginatedResource, KypoRequestedPagination} from 'kypo-common';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {PoolOverviewService} from './pool-overview.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {PoolApi, SandboxInstanceApi} from 'kypo-sandbox-api';


/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get pools and perform various operations to modify them.
 */
@Injectable()
export class PoolOverviewConcreteService extends PoolOverviewService {

  private lastPagination: KypoRequestedPagination;

  constructor(private poolApi: PoolApi,
              private sandboxApi: SandboxInstanceApi,
              private alertService: AlertService,
              private router: Router,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets all pools with passed pagination and updates related observables or handles an error
   * @param pagination requested pagination
   */
  getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<Pool>> {
    this.lastPagination = pagination;
    this.hasErrorSubject$.next(false);
    return this.poolApi.getPools(pagination)
      .pipe(
        tap(
          paginatedPools => {
            this.resourceSubject$.next(paginatedPools);
          },
          err => {
            this.errorHandler.emit(err, 'Fetching pools');
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
  allocate(pool: Pool, count: number = -1): Observable<any> {
    let allocation$: Observable<any>;
    if (count <= 0) {
      allocation$ = this.sandboxApi.allocateSandboxes(pool.id);
    } else {
      allocation$ = this.sandboxApi.allocateSandboxes(pool.id, count);
    }
    return allocation$
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Allocation of pool ${pool.id} started`),
          err => this.errorHandler.emit(err, `Allocation of pool ${pool.id}`)
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Deletes a pool, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be deleted
   */
  delete(pool: Pool): Observable<any> {
    return this.poolApi.deletePool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Pool ${pool.id} was deleted`),
            err => this.errorHandler.emit(err, `Deleting pool ${pool.id}`)
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Clears a pool by deleting all associated sandbox instances, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be cleared
   */
  clear(pool: Pool): Observable<any> {
    return this.poolApi.clearPool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Pool ${pool.id} was cleared`),
          err => this.errorHandler.emit(err, `Clearing pool ${pool.id}`)
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  create(): Observable<any> {
    return from(this.router.navigate([RouteFactory.toCreatePool()]))
  }


  lock(pool: Pool): Observable<any> {
    return this.poolApi.lockPool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Pool ${pool.id} was locked`),
          err => this.errorHandler.emit(err, `Locking pool ${pool.id}`)),
        switchMap(_ => this.getAll(this.lastPagination))
      )
  }

  unlock(pool: Pool): Observable<any> {
    return this.poolApi.unlockPool(pool.id, pool.lockId)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, `Pool ${pool.id} was unlocked`),
          err => this.errorHandler.emit(err, `Unlocking pool ${pool.id}`)),
        switchMap(_ => this.getAll(this.lastPagination))
      )
  }
}
