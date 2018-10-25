import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {SandboxDefinitionSetterService} from "../../../../services/data-setters/sandbox-definition-setter.service";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {UploadDialogComponent} from "../../../shared/upload-dialog/upload-dialog.component";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";

export class SandboxDefinitionTableDataObject {
  sandbox: SandboxDefinition;
  associatedTrainingDefinitions: TrainingDefinition[];
  canBeRemoved: boolean;
}

@Component({
  selector: 'designer-overview-sandbox-definition',
  templateUrl: './sandbox-definition-overview.component.html',
  styleUrls: ['./sandbox-definition-overview.component.css']
})
/**
 * Component displaying overview of sandbox definitions. Contains button for upload sandbox definitions,
 * table with all sandbox definitions associated with currently logged in user and possible actions for sandbox definition.
 */
export class SandboxDefinitionOverviewComponent implements OnInit {

  displayedColumns: string[] = ['title', 'associatedTrainingDefs', 'authors', 'actions'];

  dataSource: MatTableDataSource<SandboxDefinitionTableDataObject>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading = true;
  isInErrorState = false;
  resultsLength: number;

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService,
    private sandboxDefinitionSetter: SandboxDefinitionSetterService
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
    const dialogRef = this.dialog.open(UploadDialogComponent, {
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
  removeSandboxDefinition(sandboxDataObject: SandboxDefinitionTableDataObject) {
    this.sandboxDefinitionSetter.removeSandboxDefinition(sandboxDataObject.sandbox.id)
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
    this.sandboxDefinitionSetter.deploySandboxDefinition(id)
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
          this.isLoading = true;
          return this.sandboxDefinitionGetter.getSandboxDefsWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoading = false;

          this.resultsLength = data.length;

          return this.mapSandboxDefsToTableObjects(data);
        }),
        catchError((err) => {
          this.isLoading = false;
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
  private mapSandboxDefsToTableObjects(data: SandboxDefinition[]): SandboxDefinitionTableDataObject[] {
    const result: SandboxDefinitionTableDataObject[] = [];
    data.forEach(sandbox => {
      const tableDataObject = new SandboxDefinitionTableDataObject();
      tableDataObject.sandbox = sandbox;
      this.trainingDefinitionGetter.getTrainingDefinitionsBySandboxDefinitionId(sandbox.id)
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
  private createDataSource(data: SandboxDefinitionTableDataObject[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: SandboxDefinitionTableDataObject, filter: string) =>
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
