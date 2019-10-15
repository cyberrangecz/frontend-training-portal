import {Injectable} from '@angular/core';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {BehaviorSubject, Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PoolService} from './pool.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class PoolConcreteService extends PoolService {

  private poolsSubject: BehaviorSubject<PaginatedResource<SandboxPool[]>> = new BehaviorSubject(this.initSubject());
  pools$: Observable<PaginatedResource<SandboxPool[]>> = this.poolsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>> {
    this.hasErrorSubject.next(false);
    return this.sandboxInstanceFacade.getPools(pagination)
      .pipe(
        tap(
          paginatedPools => {
            this.poolsSubject.next(paginatedPools);
            this.totalLengthSubject.next(paginatedPools.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching pools');
            this.hasErrorSubject.next(true);
          }
        ),
      );
  }

  allocate(pool: SandboxPool, count: number = -1): Observable<any> {
    let allocation$: Observable<any>;
    if (count <= 0) {
      allocation$ = this.sandboxInstanceFacade.allocate(pool.id);
    } else {
      allocation$ = this.sandboxInstanceFacade.allocate(pool.id, count);
    }
    return allocation$
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Allocating sandboxes')})
      );
  }

  delete(pool: SandboxPool): Observable<any> {
    return this.sandboxInstanceFacade.deletePool(pool.id)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Deleting pool')})
      );
  }

  clear(pool: SandboxPool): Observable<any> {
    return this.sandboxInstanceFacade.clearPool(pool.id)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Clearing pool')})
      );
  }

  private initSubject(): PaginatedResource<SandboxPool[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
