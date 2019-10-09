import {SandboxDefinitionService} from '../shared/sandbox-definition.service';
import {Observable, Subject} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {tap} from 'rxjs/operators';
import {SandboxDefinitionFacade} from '../facades/sandbox-definition-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {Injectable} from '@angular/core';
import {SandboxDefinitionTableCreator} from '../../model/table-adapters/sandbox-definition-table-creator';
import {SandboxDefinitionInfo} from '../../components/sandbox-definition/add-sandbox-definition-dialog/sandbox-definition-info';

@Injectable()
export class SandboxDefinitionConcreteService extends SandboxDefinitionService {

  constructor(private sandboxDefinitionFacade: SandboxDefinitionFacade,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private sandboxDefinitionsSubject: Subject<Kypo2Table<SandboxDefinitionTableRow>> = new Subject();
  sandboxDefinitions$: Observable<Kypo2Table<SandboxDefinitionTableRow>> = this.sandboxDefinitionsSubject.asObservable();

  getAll(pagination?: RequestedPagination): Observable<PaginatedResource<SandboxDefinitionTableRow[]>> {
    return this.sandboxDefinitionFacade.getAllPaginated(pagination).pipe(
      tap(sandboxes => this.sandboxDefinitionsSubject.next(SandboxDefinitionTableCreator.create(sandboxes)))
    );
  }

  add(result: SandboxDefinitionInfo): Observable<any> {
    return this.sandboxDefinitionFacade.add(result.sandboxGitlabUrl, result.sandboxRevision)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Uploading sandbox definition')})
      );
  }

  delete(id: number): Observable<any> {
    return this.sandboxDefinitionFacade.delete(id)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Removing sandbox definition')})
      );
  }
}
