import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Observable, of} from 'rxjs';
import {catchError, map, takeWhile} from 'rxjs/operators';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {AlertTypeEnum} from '../../../model/enums/alert-type.enum';
import {SandboxDefinition} from '../../../model/sandbox/definition/sandbox-definition';
import {SandboxDefinitionTableRow} from '../../../model/table-adapters/sandbox-definition-table-row';
import {TrainingDefinitionInfo} from '../../../model/training/training-definition-info';
import {SandboxDefinitionFacade} from '../../../services/facades/sandbox-definition-facade.service';
import {TrainingDefinitionFacade} from '../../../services/facades/training-definition-facade.service';
import {AlertService} from '../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {BaseComponent} from '../../base.component';
import {ActionConfirmationDialogComponent} from '../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AddSandboxDefinitionDialogComponent} from '../add-sandbox-definition-dialog/add-sandbox-definition-dialog.component';

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

  displayedColumns: string[] = ['id', 'title', 'associatedTrainingDefs', 'actions'];
  dataSource: MatTableDataSource<SandboxDefinitionTableRow>;
  isInErrorState = false;

  resultsLength$: Observable<number>;
  totalSandboxdefinitions$: Observable<SandboxDefinitionTableRow[]>;

  constructor(private dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) {
    super();
  }

  ngOnInit() {
  }

  fetchData(event) {
    this.dataSource = event;
    const tableData$ = this.sandboxDefinitionFacade.getAllPaginated(
      new RequestedPagination(
        event.pagination.page,
        event.pagination.size,
        '',
        ''
      )
    );
    this.resultsLength$ = tableData$.pipe(map(data =>
        data.pagination.totalElements
      ),
      catchError((err) => {
        this.isInErrorState = true;
        this.errorHandler.display(err, 'Loading sandbox definitions');
        return of(-1);
      }));

    this.totalSandboxdefinitions$ = tableData$.pipe(map( data => {
        this.addAdditionalInfo(data.elements);
        return data.elements;
      }),
      catchError((err) => {
        this.isInErrorState = true;
        this.errorHandler.display(err, 'Loading sandbox definitions');
        return of([]);
      }));
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
    this.sandboxDefinitionFacade.delete(sandboxId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox was successfully deleted.');
          this.fetchData(this.dataSource);
        },
        err => this.errorHandler.display(err, 'Removing sandbox definition'));
  }

  /**
   * Uploads sandbox definition with data from dialog and creates alert with a result of the upload
   */
  private addSandboxDefinition(result) {
    this.sandboxDefinitionFacade.add(result.sandboxGitlabUrl, result.sandboxRevision)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        result => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully uploaded');
          this.fetchData(this.dataSource);
        },
        err => this.errorHandler.display(err, 'Uploading sandbox definition')
      );
  }

  private addAdditionalInfo(rows: SandboxDefinitionTableRow[]) {
    rows.forEach(row => {
      this.trainingDefinitionFacade.getByAssociatedSandboxDefinition(row.sandbox.id)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(result => {
          row.associatedTrainingDefinitions = result;
          row.canBeRemoved = this.canSandboxBeRemoved(row.sandbox, row.associatedTrainingDefinitions);
        });
    });
  }

  private canSandboxBeRemoved(sandbox: SandboxDefinition, assocTrainings: TrainingDefinitionInfo[]): boolean {
        return assocTrainings.length === 0;
  }
}
