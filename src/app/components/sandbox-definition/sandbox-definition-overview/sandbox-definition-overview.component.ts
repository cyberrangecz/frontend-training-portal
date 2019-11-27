import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EMPTY, Observable, of} from 'rxjs';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {SandboxDefinitionTableRow} from '../../../model/table-adapters/sandbox-definition-table-row';
import {ActionConfirmationDialogComponent} from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {BaseComponent} from '../../base.component';
import {AddSandboxDefinitionDialogComponent} from '../add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';
import {SandboxDefinitionService} from '../../../services/shared/sandbox-definition.service';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {SandboxDefinitionInfo} from '../add-sandbox-definition-dialog/sandbox-definition-info';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {SandboxDefinitionTableCreator} from '../../../model/table-adapters/sandbox-definition-table-creator';

@Component({
  selector: 'kypo2-sandbox-definition-overview',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.scss'],
})

/**
 * Component displaying overview of sandbox definitions. Contains button for upload sandbox definitions,
 * table with all sandbox definitions associated with currently logged in user and possible actions for sandbox definition.
 */
export class SandboxDefinitionOverviewComponent extends BaseComponent implements OnInit {

  sandboxDefinitions$: Observable<Kypo2Table<SandboxDefinitionTableRow>>;
  tableHasError$: Observable<boolean>;
  tableTotalLength$: Observable<number>;

  private lastLoadEvent: LoadTableEvent;

  constructor(private dialog: MatDialog,
              private errorHandler: ErrorHandlerService,
              private sandboxDefinitionService: SandboxDefinitionService
              ) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  onLoadEvent(event: LoadTableEvent) {
    this.sandboxDefinitionService.getAll(event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  onSandboxDefinitionTableAction(event: TableActionEvent<SandboxDefinitionTableRow>) {
    if (event.action.label.toLocaleLowerCase() === 'delete') {
      this.deleteSandboxDefinition(event.element);
    }
  }

  /**
   * Displays dialog window to upload a file with sandbox definition and creates alert with a result of the upload
   */
  openSandboxDefinitionDialog() {
    const dialogRef = this.dialog.open(AddSandboxDefinitionDialogComponent);
    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result =>
          result && result.type === 'confirm'
            ? this.sandboxDefinitionService.add(result.data)
            : EMPTY
        )
      )
      .subscribe();
  }

  /**
   * Removes sandbox definition data object from data source and sends request to delete the sandbox in database
   * @param {SandboxDefinitionTableRow} sandboxRow sandbox definition data row which should be deleted
   */
  deleteSandboxDefinition(sandboxRow: SandboxDefinitionTableRow) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'Sandbox Definition',
        action: 'delete',
        title: sandboxRow.sandbox.title
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap(result =>
          result && result.type === 'confirm'
            ? this.sandboxDefinitionService.delete(sandboxRow.id)
            : EMPTY
        )
      ).subscribe();
  }

  private initTable() {
    this.sandboxDefinitions$ = this.sandboxDefinitionService.sandboxDefinitions$
      .pipe(
        map(paginatedSandboxes => SandboxDefinitionTableCreator.create(paginatedSandboxes))
      );
    this.lastLoadEvent = new LoadTableEvent(null, null);
    this.onLoadEvent(this.lastLoadEvent);
    this.tableHasError$ = this.sandboxDefinitionService.hasError$;
    this.tableTotalLength$ = this.sandboxDefinitionService.totalLength$;
  }
}
