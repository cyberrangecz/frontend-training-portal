import {PoolService} from './pool.service';
import {Injectable} from '@angular/core';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable, Subject} from 'rxjs';
import {SandboxPool} from '../../model/sandbox/sandbox-pool';
import {tap} from 'rxjs/operators';
import {PoolTableCreator} from '../../model/table-adapters/pool-table-creator';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';

@Injectable()
export class PoolConcreteService extends PoolService {

  private poolsSubject: Subject<Kypo2Table<SandboxPool>> = new Subject();
  pools$: Observable<Kypo2Table<SandboxPool>> = this.poolsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  get(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>> {
    return this.sandboxInstanceFacade.getPools(pagination)
      .pipe(
        tap(paginatedPools => this.poolsSubject.next(PoolTableCreator.create(paginatedPools))),
        tap({error: err => this.errorHandler.display(err, 'Fetching pools')})
      );
  }
}
