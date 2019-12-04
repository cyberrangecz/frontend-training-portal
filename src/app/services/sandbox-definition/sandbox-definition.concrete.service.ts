import { SandboxDefinitionService } from '../shared/sandbox-definition.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResource } from '../../model/table/other/paginated-resource';
import { Pagination, RequestedPagination } from 'kypo2-table';
import { switchMap, tap } from 'rxjs/operators';
import { SandboxDefinitionFacade } from '../facades/sandbox-definition-facade.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { Injectable } from '@angular/core';
import { SandboxDefinitionInfo } from '../../components/sandbox-definition/add-sandbox-definition-dialog/sandbox-definition-info';
import { AlertTypeEnum } from '../../model/enums/alert-type.enum';
import { AlertService } from '../shared/alert.service';
import { environment } from '../../../environments/environment';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

@Injectable()
export class SandboxDefinitionConcreteService extends SandboxDefinitionService {

  constructor(private sandboxDefinitionFacade: SandboxDefinitionFacade,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService) {
    super();
  }

  private sandboxDefinitionsSubject: BehaviorSubject<PaginatedResource<SandboxDefinition[]>> = new BehaviorSubject(this.initSubject());
  sandboxDefinitions$: Observable<PaginatedResource<SandboxDefinition[]>> = this.sandboxDefinitionsSubject.asObservable();

  lastPagination: RequestedPagination;

  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinition[]>> {
    this.hasErrorSubject$.next(false);
    this.lastPagination = pagination;
    return this.sandboxDefinitionFacade.getAllPaginated(pagination).pipe(
      tap(paginatedResource => {
        this.sandboxDefinitionsSubject.next(paginatedResource);
        this.totalLengthSubject.next(paginatedResource.pagination.totalElements);
      },
        err => {
          this.errorHandler.display(err, 'Fetching sandbox definitions');
          this.hasErrorSubject$.next(true);
        })
    );
  }

  add(result: SandboxDefinitionInfo): Observable<any> {
    return this.sandboxDefinitionFacade.add(result.sandboxGitlabUrl, result.sandboxRevision)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully created'),
          err => this.errorHandler.display(err, 'Creating sandbox definition')
        ),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }

  delete(id: number): Observable<PaginatedResource<SandboxDefinition[]>> {
    return this.sandboxDefinitionFacade.delete(id)
      .pipe(
        tap(
          _ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully deleted'),
          err => this.errorHandler.display(err, 'Removing sandbox definition')
        ),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }

  private initSubject(): PaginatedResource<SandboxDefinition[]> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
