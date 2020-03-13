import {SandboxDefinitionOverviewService} from './sandbox-definition-overview.service';
import {EMPTY, Observable, of} from 'rxjs';
import {PaginatedResource} from '../../model/table/other/paginated-resource';
import {RequestedPagination} from 'kypo2-table';
import {switchMap, tap} from 'rxjs/operators';
import {SandboxDefinitionApi} from '../api/sandbox-definition-api.service';
import {ErrorHandlerService} from '../shared/error-handler.service';
import {Injectable} from '@angular/core';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertService} from '../shared/alert.service';
import {SandboxDefinition} from '../../model/sandbox/definition/sandbox-definition';
import {RouteFactory} from '../../model/routes/route-factory';
import {Router} from '@angular/router';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-common';
import {MatDialog} from '@angular/material/dialog';

/**
 * Basic implementation of a layer between a component and an API service.
 * Can manually get sandbox definitions and perform various operations to modify them.
 */
@Injectable()
export class SandboxDefinitionOverviewConcreteService extends SandboxDefinitionOverviewService {

  constructor(private sandboxDefinitionFacade: SandboxDefinitionApi,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService) {
    super();
  }

  private lastPagination: RequestedPagination;

  /**
   * Gets all sandbox definitions with passed pagination and updates related observables or handles an error
   * @param pagination requested pagination
   */
  getAll(pagination: RequestedPagination): Observable<PaginatedResource<SandboxDefinition>> {
    this.hasErrorSubject$.next(false);
    this.lastPagination = pagination;
    return this.sandboxDefinitionFacade.getAllPaginated(pagination).pipe(
      tap(paginatedResource => {
        this.resourceSubject$.next(paginatedResource);
      },
        err => {
          this.errorHandler.emit(err, 'Fetching sandbox definitions');
          this.hasErrorSubject$.next(true);
        })
    );
  }

  create(): Observable<any> {
    return of(this.router.navigate([RouteFactory.toNewSandboxDefinition()]));
  }

  /**
   * Deletes a sandbox definition, informs about the result and updates list of sandbox definitions or handles an error
   * @param sandboxDefinition sandbox definition to be deleted
   */
  delete(sandboxDefinition: SandboxDefinition): Observable<PaginatedResource<SandboxDefinition>> {
    return this.displayDialogToDelete(sandboxDefinition)
      .pipe(
        switchMap(result => result === CsirtMuDialogResultEnum.CONFIRMED
          ? this.callApiToDelete(sandboxDefinition)
          : EMPTY
        )
      );
  }

  private displayDialogToDelete(sandboxDefinition: SandboxDefinition): Observable<CsirtMuDialogResultEnum> {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Sandbox Definition',
        `Do you want to delete sandbox definition "${sandboxDefinition.title}"?`,
        'Cancel',
        'Delete'
      )
    });
    return dialogRef.afterClosed();
  }

  private callApiToDelete(sandboxDefinition: SandboxDefinition): Observable<PaginatedResource<SandboxDefinition>> {
    return this.sandboxDefinitionFacade.delete(sandboxDefinition.id)
      .pipe(
        tap(
          _ => this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully deleted'),
          err => this.errorHandler.emit(err, 'Removing sandbox definition')
        ),
        switchMap(() => this.getAll(this.lastPagination))
      );
  }
}
