import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {SandboxDefinitionFacade} from "../../../../services/facades/sandbox-definition-facade.service";
import {TrainingDefinitionFacade} from "../../../../services/facades/training-definition-facade.service";
import {AlertService} from "../../../../services/shared/alert.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap, takeWhile} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../model/enums/alert-type.enum";
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {SandboxDefinitionTableAdapter} from "../../../../model/table-adapters/sandbox-definition-table-adapter";
import {AssociatedTrainingDefinitionsDialogComponent} from './associated-training-definitions-dialog/associated-training-definitions-dialog.component';
import {TrainingDefinitionInfo} from '../../../../model/training/training-definition-info';
import {AddSandboxDefinitionDialogComponent} from "./add-sandbox-definition-dialog/add-sandbox-definition-dialog.component";
import {ActionConfirmationDialog} from "../../../shared/delete-dialog/action-confirmation-dialog.component";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'designer-overview-sandbox-definition',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.css']
})

/**
 * Component displaying overview of sandbox definitions. Contains button for upload sandbox definitions,
 * table with all sandbox definitions associated with currently logged in user and possible actions for sandbox definition.
 */
export class SandboxDefinitionOverviewComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'associatedTrainingDefs', 'url', 'actions'];

  dataSource: MatTableDataSource<SandboxDefinitionTableAdapter>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoadingResults = true;
  isInErrorState = false;
  resultsLength: number;

  constructor(private dialog: MatDialog,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) {
    super();
  }

  ngOnInit() {
    this.initDataSource();
  }


  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeSandboxUrlState(row: SandboxDefinitionTableAdapter) {
    row.urlShortened = !row.urlShortened;
  }

  /**
   * Displays dialog window to upload a file with sandbox definition and creates alert with a result of the upload
   */
  addSandboxDefinition() {
    const dialogRef = this.dialog.open(AddSandboxDefinitionDialogComponent);
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'success') {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox definition was successfully uploaded');
        this.fetchData();
      }
    });
  }
  /**
   * Removes sandbox definition data object from data source and sends request to delete the sandbox in database
   * @param {SandboxDefinitionTableAdapter} sandboxRow sandbox definition data row which should be deleted
   */
  deleteSandboxDefinition(sandboxRow: SandboxDefinitionTableAdapter) {
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'Sandbox Definition',
        action: 'delete',
        title: sandboxRow.sandbox.title
      }
    });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result && result.type === 'confirm')
          this.sendRequestToDeleteSandboxDefinition(sandboxRow.sandbox.id)
      });
  }

  showAssociatedTrainingDefinitions(row: SandboxDefinitionTableAdapter) {
    this.dialog.open(AssociatedTrainingDefinitionsDialogComponent, {
      data: {
        sandboxDefinition: row.sandbox,
        trainingDefinitions: row.associatedTrainingDefinitions
      }
    });
  }

  /**
   * Creates table data source from sandbox definitions retrieved from a server. Only sandbox definitions where
   * active user is listed as an author are shown
   */
  private initDataSource() {
    this.sort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'title';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private fetchData() {
    let timeoutHandle = 0;
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          timeoutHandle =  window.setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.sandboxDefinitionFacade.getSandboxDefs();
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          return this.mapSandboxDefsToTableObjects(data);
        }),
        catchError((err) => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayInAlert(err, 'Loading sandbox definitions');
          return of([]);
        })
      ).subscribe(data => this.createDataSource(data));
  }

  /**
   * Maps sandbox definitions to table data objects
   * @param data sandbox definitions
   */
  private mapSandboxDefsToTableObjects(data: SandboxDefinition[]): SandboxDefinitionTableAdapter[] {
    const result: SandboxDefinitionTableAdapter[] = [];
    data.forEach(sandbox => {
      const tableDataObject = new SandboxDefinitionTableAdapter();
      tableDataObject.sandbox = sandbox;
      this.trainingDefinitionFacade.getTrainingDefinitionsAssociatedWithSandboxDefinition(sandbox.id)
        .pipe(takeWhile(() => this.isAlive))
        .subscribe(result => {
          tableDataObject.associatedTrainingDefinitions = result;
          tableDataObject.canBeRemoved = this.canSandboxBeRemoved(tableDataObject.sandbox, tableDataObject.associatedTrainingDefinitions);
        });

      result.push(tableDataObject);
    });
    return result;
  }

  /**
   * Creates data source from sandbox definiton table data objects
   * @param data
   */
  private createDataSource(data: SandboxDefinitionTableAdapter[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: SandboxDefinitionTableAdapter, filter: string) =>
        data.sandbox.title.toLowerCase().indexOf(filter) !== -1
  }

  /**
   * Determines if sandbox definition can be removed (if sandbox is not associated with any training definition or all
   * associated training definitions are archived.
   * @param {SandboxDefinition} sandbox definition to determine if can be removed
   * @param {TrainingDefinitionInfo[]} assocTrainings training definitions associated with the sandbox definitions
   * @returns {boolean} true if sandbox definition can be removed, false otherwise
   */
  private canSandboxBeRemoved(sandbox: SandboxDefinition, assocTrainings: TrainingDefinitionInfo[]): boolean {
        return assocTrainings.length === 0;
  }

  private sendRequestToDeleteSandboxDefinition(sandboxId: number) {
    this.sandboxDefinitionFacade.deleteSandboxDefinition(sandboxId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox was successfully deleted.');
          this.fetchData();
        },
        err => this.errorHandler.displayInAlert(err, 'Removing sandbox definition'));
  }
}
