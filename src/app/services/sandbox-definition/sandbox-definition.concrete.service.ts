import {SandboxDefinitionService} from '../shared/sandbox-definition.service';
import {Observable, Subject} from 'rxjs';
import {PaginatedResource} from '../../model/table-adapters/paginated-resource';
import {SandboxDefinitionTableRow} from '../../model/table-adapters/sandbox-definition-table-row';
import {Kypo2Table, RequestedPagination} from 'kypo2-table';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxDefinitionFacade} from '../facades/sandbox-definition-facade.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {Injectable} from '@angular/core';
import {SandboxDefinitionTableCreator} from '../../model/table-adapters/sandbox-definition-table-creator';
import {SandboxDefinitionInfo} from '../../components/sandbox-definition/add-sandbox-definition-dialog/sandbox-definition-info';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertService} from '../shared/alert.service';

@Injectable()
export class SandboxDefinitionConcreteService extends SandboxDefinitionService {

  constructor(private sandboxDefinitionFacade: SandboxDefinitionFacade,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) {
    super();
  }

  private sandboxDefinitionsSubject: Subject<Kypo2Table<SandboxDefinitionTableRow>> = new Subject();
  sandboxDefinitions$: Observable<Kypo2Table<SandboxDefinitionTableRow>> = this.sandboxDefinitionsSubject.asObservable();

  lastPagination: RequestedPagination;

  getAll(pagination?: RequestedPagination): Observable<PaginatedResource<SandboxDefinitionTableRow[]>> {
    this.lastPagination = pagination;
    return this.sandboxDefinitionFacade.getAllPaginated(pagination).pipe(
      tap(sandboxes => this.sandboxDefinitionsSubject.next(SandboxDefinitionTableCreator.create(sandboxes)),
          err => this.errorHandler.display(err, 'Fetching sandbox definitions'))
    );
  }

  add(result: SandboxDefinitionInfo): Observable<any> {
    return this.sandboxDefinitionFacade.add(result.sandboxGitlabUrl, result.sandboxRevision)
      .pipe(
        tap({error: err => this.errorHandler.display(err, 'Uploading sandbox definition')}),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }

  delete(id: number): Observable<PaginatedResource<SandboxDefinitionTableRow[]>> {
    return this.sandboxDefinitionFacade.delete(id)
      .pipe(
        tap(
          _ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully uploaded'),
          err => this.errorHandler.display(err, 'Removing sandbox definition')
        ),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }
}
