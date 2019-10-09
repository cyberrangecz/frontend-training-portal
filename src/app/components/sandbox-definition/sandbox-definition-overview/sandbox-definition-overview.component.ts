import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AlertService} from '../../../services/shared/alert.service';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {SandboxDefinitionTableRow} from '../../../model/table-adapters/sandbox-definition-table-row';
import {ActionConfirmationDialogComponent} from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {BaseComponent} from '../../base.component';
import {AddSandboxDefinitionDialogComponent} from '../add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';
import {SandboxDefinitionService} from '../../../services/shared/sandbox-definition.service';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {SandboxDefinitionInfo} from '../add-sandbox-definition-dialog/sandbox-definition-info';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';

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
  sandboxDefinitionTableHasError = false;
  sandboxDefinitionsTotalLength = 0;

  private lastLoadEvent: LoadTableEvent;

  constructor(private dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private sandboxDefinitionService: SandboxDefinitionService
              ) {
    super();
  }

  ngOnInit() {
    this.sandboxDefinitions$ = this.sandboxDefinitionService.sandboxDefinitions$;
    this.lastLoadEvent = new LoadTableEvent(null, null);
    this.onLoadEvent(this.lastLoadEvent);
  }

  onLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastLoadEvent = loadEvent;
      this.fetchData(loadEvent);
    } else {
      this.fetchData(this.lastLoadEvent);
    }
  }

  fetchData(event) {
    let sandboxDefinitions;
    this.sandboxDefinitionTableHasError = false;

    if (event.pagination) {
      sandboxDefinitions = this.sandboxDefinitionService.getAll(event.pagination);
    } else {
      sandboxDefinitions = this.sandboxDefinitionService.getAll();
    }
    sandboxDefinitions.pipe(
      takeWhile(_ => this.isAlive),
    )
      .subscribe(
        paginatedSandboxes => {
          this.sandboxDefinitionsTotalLength = paginatedSandboxes.pagination.totalElements;
        },
        err => this.sandboxDefinitionTableHasError = true);
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
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.addSandboxDefinition(result.data);
        }
      });
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
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm') {
          this.sendRequestToDeleteSandboxDefinition(sandboxRow.sandbox.id);
        }
      });
  }

  private sendRequestToDeleteSandboxDefinition(sandboxId: number) {
    this.sandboxDefinitionService.delete(sandboxId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox was successfully deleted.');
        this.fetchData(resp);
    });
  }

  /**
   * Uploads sandbox definition with data from dialog and creates alert with a result of the upload
   */
  private addSandboxDefinition(result: SandboxDefinitionInfo) {
    this.sandboxDefinitionService.add(result)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(res => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully uploaded');
        this.fetchData(result);
    });
  }
}
