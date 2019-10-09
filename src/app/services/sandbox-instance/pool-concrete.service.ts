import {Injectable} from '@angular/core';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SandboxPool} from '../../model/sandbox/pool/sandbox-pool';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {PoolTableCreator} from '../../model/table-adapters/pool-table-creator';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {PoolService} from './pool.service';

@Injectable()
export class PoolConcreteService extends PoolService {

  private poolsSubject: Subject<Kypo2Table<SandboxPool>> = new Subject();
  pools$: Observable<Kypo2Table<SandboxPool>> = this.poolsSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxPool[]>> {
    return this.sandboxInstanceFacade.getPools(pagination)
      .pipe(
        tap(
          paginatedPools => this.poolsSubject.next(PoolTableCreator.create(paginatedPools)),
          err => this.errorHandler.display(err, 'Fetching pools')
        ),
      );
  }
}
