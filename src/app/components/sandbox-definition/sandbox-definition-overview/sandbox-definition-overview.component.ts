import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EMPTY, Observable} from 'rxjs';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {ActionConfirmationDialogComponent} from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {BaseComponent} from '../../base.component';
import {SandboxDefinitionService} from '../../../services/sandbox-definition/sandbox-definition.service';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {SandboxDefinitionTableCreator} from '../../../model/table/factory/sandbox-definition-table-creator';
import {SandboxDefinition} from '../../../model/sandbox/definition/sandbox-definition';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {ConfirmationDialogActionEnum} from '../../../model/enums/confirmation-dialog-action-enum';

@Component({
  selector: 'kypo2-sandbox-definition-overview',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.scss'],
})

/**
 * Component displaying overview of sandbox definitions. Contains button for create sandbox definitions,
 * table with all sandbox definitions and possible actions on sandbox definition.
 */
export class SandboxDefinitionOverviewComponent extends BaseComponent implements OnInit {

  sandboxDefinitions$: Observable<Kypo2Table<SandboxDefinition>>;
  tableHasError$: Observable<boolean>;
  tableTotalLength$: Observable<number>;

  private lastLoadEvent: LoadTableEvent;

  constructor(private router: Router,
              private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
              private sandboxDefinitionService: SandboxDefinitionService
              ) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Refreshes table with new data
   * @param event to load data
   */
  onLoadEvent(event: LoadTableEvent) {
    this.sandboxDefinitionService.getAll(event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves correct action based on received event and performs it
   * @param event table action event emitted by child table component
   */
  onSandboxDefinitionTableAction(event: TableActionEvent<SandboxDefinition>) {
    if (event.action.id === SandboxDefinitionTableCreator.DELETE_ACTION_ID) {
      this.deleteSandboxDefinition(event.element);
    }
  }

  /**
   * Navigates to create sandbox definition page
   */
  create() {
    this.router.navigate([RouteFactory.toNewSandboxDefinition()]);
  }

  /**
   * Displays confirmation dialog and in case of confirmation calls service to delete sandbox definition
   * @param sandbox sandbox to delete
   */
  deleteSandboxDefinition(sandbox: SandboxDefinition) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'Sandbox Definition',
        action: ConfirmationDialogActionEnum.DELETE,
        title: sandbox.title
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result =>
          result && result.type === 'confirm'
            ? this.sandboxDefinitionService.delete(sandbox.id)
            : EMPTY
        )
      ).subscribe();
  }

  private initTable() {
    this.sandboxDefinitions$ = this.sandboxDefinitionService.definitions$
      .pipe(
        map(paginatedSandboxes => SandboxDefinitionTableCreator.create(paginatedSandboxes))
      );
    this.lastLoadEvent = new LoadTableEvent(new RequestedPagination(0, environment.defaultPaginationSize, '', ''), null);
    this.onLoadEvent(this.lastLoadEvent);
    this.tableHasError$ = this.sandboxDefinitionService.hasError$;
    this.tableTotalLength$ = this.sandboxDefinitionService.totalLength$;
  }
}
