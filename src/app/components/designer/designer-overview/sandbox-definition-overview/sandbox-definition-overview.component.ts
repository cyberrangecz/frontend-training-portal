import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {SandboxDefinitionFacade} from "../../../../services/facades/sandbox-definition-facade.service";
import {TrainingDefinitionFacade} from "../../../../services/facades/training-definition-facade.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {DesignerUploadDialogComponent} from "../../upload-dialog/designer-upload-dialog.component";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";
import {SandboxDefinitionTableDataModel} from "../../../../model/table-models/sandbox-definition-table-data-model";

@Component({
  selector: 'designer-overview-sandbox-definition',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.css']
})

//TODO: implement pagination when rest api is finished
/**
 * Component displaying overview of sandbox definitions. Contains button for upload sandbox definitions,
 * table with all sandbox definitions associated with currently logged in user and possible actions for sandbox definition.
 */
export class SandboxDefinitionOverviewComponent implements OnInit {

  displayedColumns: string[] = ['title', 'associatedTrainingDefs', 'authors', 'actions'];

  dataSource: MatTableDataSource<SandboxDefinitionTableDataModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults = true;
  isInErrorState = false;
  resultsLength: number;

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionFacade: TrainingDefinitionFacade,
    private sandboxDefinitionFacade: SandboxDefinitionFacade,
  ) {
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

  /**
   * Displays dialog window to upload a file with sandbox definition and creates alert with a result of the upload
   */
  uploadSandboxDefinition() {
    const dialogRef = this.dialog.open(DesignerUploadDialogComponent, {
      data: {
        title: 'Upload Sandbox Definition',
        type: 'sandbox'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.emitAlert(result.type, result.message);
        this.fetchData();
      }
    });
  }
  /**
   * Removes sandbox definition data object from data source and sends request to delete the sandbox in database
   * @param {SandboxDefinitionTableDataObject} sandboxDataObject sandbox definition data object which should be deleted
   */
  removeSandboxDefinition(sandboxDataObject: SandboxDefinitionTableDataModel) {
    this.sandboxDefinitionFacade.removeSandboxDefinition(sandboxDataObject.sandbox.id)
      .subscribe(resp => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox was successfully removed.');
        this.fetchData();
      },
        err => this.errorHandler.displayHttpError(err, 'Removing sandbox definition'));
  }

  /**
   * Replaces the original sandbox definition with a new one uploaded by the user.
   * Opens dialog window where user can choose file to upload
   * @param {number} id id of sandbox definition which should be replaced
   */
  updateSandboxDefinition(id: number) {
    // TODO: replace original file with the new one
    this.uploadSandboxDefinition();
  }

  /**
   * Deploys sandbox definition TBD
   * @param {number} id id of sandbox definition which should be deployed
   */
  deploySandboxDefinition(id: number) {
    // TODO: Handle response
    this.sandboxDefinitionFacade.deploySandboxDefinition(id)
      .subscribe(resp => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Sandbox was successfully download.');
          this.fetchData();
        },
        err => this.errorHandler.displayHttpError(err, 'Deploying sandbox definition'));
  }

  /**
   * Creates table data source from sandbox definitions retrieved from a server. Only sandbox definitions where
   * active user is listed as an author are shown
   */
  private initDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'title';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.sandboxDefinitionFacade.getSandboxDefsWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          return this.mapSandboxDefsToTableObjects(data);
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayHttpError(err, 'Loading sandbox definitions');
          return of([]);
        })
      ).subscribe(data => this.createDataSource(data));
  }

  /**
   * Maps sandbox definitions to table data objects
   * @param data sandbox definitions
   */
  private mapSandboxDefsToTableObjects(data: SandboxDefinition[]): SandboxDefinitionTableDataModel[] {
    const result: SandboxDefinitionTableDataModel[] = [];
    data.forEach(sandbox => {
      const tableDataObject = new SandboxDefinitionTableDataModel();
      tableDataObject.sandbox = sandbox;
      this.trainingDefinitionFacade.getTrainingDefinitionsBySandboxDefinitionId(sandbox.id)
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
  private createDataSource(data: SandboxDefinitionTableDataModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: SandboxDefinitionTableDataModel, filter: string) =>
        data.sandbox.title.toLowerCase().indexOf(filter) !== -1
  }

  /**
   * Determines if sandbox definition can be removed (if sandbox is not associated with any training definition or all
   * associated training definitions are archived.
   * @param {SandboxDefinition} sandbox definition to determine if can be removed
   * @param {TrainingDefinition[]} assocTrainings training definitions associated with the sandbox definitions
   * @returns {boolean} true if sandbox definition can be removed, false otherwise
   */
  canSandboxBeRemoved(sandbox: SandboxDefinition, assocTrainings: TrainingDefinition[]): boolean {
        return assocTrainings.length === 0 || assocTrainings.every(training =>
            training.state === TrainingDefinitionStateEnum.Archived);
  }

}
