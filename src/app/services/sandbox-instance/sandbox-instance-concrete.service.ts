import {SandboxInstanceService} from './sandbox-instance.service';
import {Observable, Subject} from 'rxjs';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {tap} from 'rxjs/operators';
import {SandboxInstanceTableCreator} from '../../model/table-adapters/sandbox-instance-table-creator';
import {Injectable} from '@angular/core';

@Injectable()
export class SandboxInstanceConcreteService extends SandboxInstanceService {

  private instancesSubject: Subject<Kypo2Table<SandboxInstance>> = new Subject();
  instances$: Observable<Kypo2Table<SandboxInstance>> = this.instancesSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>> {
    return this.sandboxInstanceFacade.getSandboxes(poolId, pagination)
      .pipe(
        tap(
          instances => this.instancesSubject.next(SandboxInstanceTableCreator.create(instances)),
          err => this.errorHandler.display(err, 'Fetching sandbox instances')
        ),
      );
  }
}

