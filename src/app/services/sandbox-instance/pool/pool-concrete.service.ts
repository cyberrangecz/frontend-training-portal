import {Injectable} from '@angular/core';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../shared/error-handler.service';
import {PoolService} from './pool.service';
import {environment} from '../../../../environments/environment';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {AlertService} from '../../shared/alert.service';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';

const cacheBuster$: Subject<void> = new Subject();

@Injectable()
export class PoolConcreteService extends PoolService {
  private lastPagination: RequestedPagination;
  private poolsSubject: BehaviorSubject<PaginatedResource<SandboxPool[]>> = new BehaviorSubject(this.initSubject());
  pools$: Observable<PaginatedResource<SandboxPool[]>> = this.poolsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

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
            this.totalLengthSubject.next(paginatedPools.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching pools');
            this.hasErrorSubject$.next(true);
          }
        ),
      );
  }

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
