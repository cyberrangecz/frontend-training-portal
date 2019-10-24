import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SandboxInstance} from '../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {tap} from 'rxjs/operators';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxInstanceFacade} from '../facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {SandboxInstanceService} from './sandbox-instance.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {RequestedPagination} from '../../model/DTOs/other/requested-pagination';
import {Pagination} from 'kypo2-table';

@Injectable()
export class SandboxInstanceConcreteService extends SandboxInstanceService {

  private instancesSubject: BehaviorSubject<PaginatedResource<SandboxInstance[]>> = new BehaviorSubject(this.initSubject());
  instances$: Observable<PaginatedResource<SandboxInstance[]>> = this.instancesSubject.asObservable();

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private activatedRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  getAll(poolId: number, pagination: RequestedPagination): Observable<PaginatedResource<SandboxInstance[]>> {
    this.hasErrorSubject$.next(false);
    return this.sandboxInstanceFacade.getSandboxes(poolId, pagination)
      .pipe(
        tap(
          paginatedInstances => {
            this.instancesSubject.next(paginatedInstances);
            this.totalLengthSubject.next(paginatedInstances.pagination.totalElements);
          },
          err => {
            this.errorHandler.display(err, 'Fetching sandbox instances');
            this.hasErrorSubject$.next(true);
          }
        ),
      );
  }

  delete(sandboxInstance: SandboxInstance): Observable<any> {
    return this.sandboxInstanceFacade.delete(sandboxInstance.id)
      .pipe(
        tap({ error: err => this.errorHandler.display(err, 'Deleting sandbox instance')})
      );
  }

  private initSubject(): PaginatedResource<SandboxInstance[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}

