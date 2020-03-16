import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {KypoPaginatedResource} from 'kypo-common';
import {SandboxInstanceApi} from '../../api/sandbox-instance-api.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {PoolService} from './pool.service';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {KypoRequestedPagination} from 'kypo-common';


/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get pools and perform various operations to modify them.
 */
@Injectable()
export class PoolConcreteService extends PoolService {

  private lastPagination: KypoRequestedPagination;

  constructor(private api: SandboxInstanceApi,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  /**
   * Gets all pools with passed pagination and updates related observables or handles an error
   * @param pagination requested pagination
   */
  getAll(pagination: KypoRequestedPagination): Observable<KypoPaginatedResource<SandboxPool>> {
    this.lastPagination = pagination;
    this.hasErrorSubject$.next(false);
    return this.api.getPools(pagination)
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
  allocate(pool: SandboxPool, count: number = -1): Observable<any> {
    let allocation$: Observable<any>;
    if (count <= 0) {
      allocation$ = this.api.allocate(pool.id);
    } else {
      allocation$ = this.api.allocate(pool.id, count);
    }
    return allocation$
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Allocation started'),
          err => this.errorHandler.emit(err, 'Allocating sandboxes')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Deletes a pool, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be deleted
   */
  delete(pool: SandboxPool): Observable<any> {
    return this.api.deletePool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool was successfully deleted'),
            err => this.errorHandler.emit(err, 'Deleting pool')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }

  /**
   * Clears a pool by deleting all associated sandbox instances, informs about the result and updates list of pools or handles an error
   * @param pool a pool to be cleared
   */
  clear(pool: SandboxPool): Observable<any> {
    return this.api.clearPool(pool.id)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Pool was successfully cleared'),
          err => this.errorHandler.emit(err, 'Clear pool')
        ),
        switchMap(_ => this.getAll(this.lastPagination))
      );
  }
}
