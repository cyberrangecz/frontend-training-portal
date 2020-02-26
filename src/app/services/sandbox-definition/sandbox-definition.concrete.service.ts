import {SandboxDefinitionService} from './sandbox-definition.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {Pagination, RequestedPagination} from 'kypo2-table';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxDefinitionApi} from '../api/sandbox-definition-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {Injectable} from '@angular/core';
import {SandboxDefinitionCreateInfo} from '../../model/sandbox/definition/sandbox-definition-create-info';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertService} from '../shared/alert.service';
import {environment} from '../../../environments/environment';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get sandbox definitions and perform various operations to modify them.
 */
@Injectable()
export class SandboxDefinitionConcreteService extends SandboxDefinitionService {

  constructor(private sandboxDefinitionFacade: SandboxDefinitionApi,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastPagination: RequestedPagination;
  private sandboxDefinitionsSubject: BehaviorSubject<PaginatedResource<SandboxDefinition>> = new BehaviorSubject(this.initSubject());
  /**
   * List of sandbox definitions with currently selected pagination options
   */
  definitions$: Observable<PaginatedResource<SandboxDefinition>> = this.sandboxDefinitionsSubject.asObservable();

  /**
   * Gets all sandbox definitions with passed pagination and updates related observables or handles an error
   * @param pagination requested pagination
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinition>> {
    this.hasErrorSubject$.next(false);
    this.lastPagination = pagination;
    return this.sandboxDefinitionFacade.getAllPaginated(pagination).pipe(
      tap(paginatedResource => {
        this.sandboxDefinitionsSubject.next(paginatedResource);
        this.totalLengthSubject$.next(paginatedResource.pagination.totalElements);
      },
        err => {
          this.errorHandler.emit(err, 'Fetching sandbox definitions');
          this.hasErrorSubject$.next(true);
        })
    );
  }

  /**
   * Creates a sandbox definition, informs about the result and updates list of sandbox definitions or handles an error
   * @param sandboxDefinitionInfo container for attributes required for sandbox definition creation
   */
  create(sandboxDefinitionInfo: SandboxDefinitionCreateInfo): Observable<any> {
    return this.sandboxDefinitionFacade.create(sandboxDefinitionInfo.sandboxGitlabUrl, sandboxDefinitionInfo.sandboxRevision)
      .pipe(
        tap(_ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully created'),
          err => this.errorHandler.emit(err, 'Creating sandbox definition')
        )
      );
  }

  /**
   * Deletes a sandbox definition, informs about the result and updates list of sandbox definitions or handles an error
   * @param sandboxDefinitionId id of a sandbox definition to be deleted
   */
  delete(sandboxDefinitionId: number): Observable<PaginatedResource<SandboxDefinition>> {
    return this.sandboxDefinitionFacade.delete(sandboxDefinitionId)
      .pipe(
        tap(
          _ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully deleted'),
          err => this.errorHandler.emit(err, 'Removing sandbox definition')
        ),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }

  private initSubject(): PaginatedResource<SandboxDefinition> {
    return new PaginatedResource([], new Pagination(0, 0, environment.defaultPaginationSize, 0, 0));
  }
}
