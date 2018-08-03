import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {SandboxUploadDialogComponent} from "./sandbox-upload-dialog/sandbox-upload-dialog.component";
import {SandboxDefinitionSetterService} from "../../../../services/data-setters/sandbox-definition-setter.service";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {TrainingDefinition} from "../../../../model/training/training-definition";

export class SandboxDefinitionTableData {
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

  dataSource: MatTableDataSource<SandboxDefinitionTableData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService,
    private sandboxDefinitionSetter: SandboxDefinitionSetterService
  ) {
  }

  ngOnInit() {
    this.createTableDataSource();
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
    const dialogRef = this.dialog.open(SandboxUploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.emitAlert(result.type, result.message);
      }
    });
  }
  /**
   * Removes sandbox definition data object from data source and sends request to delete the sandbox in database
   * @param {SandboxDefinitionTableData} sandboxDataObject sandbox definition data object which should be deleted
   */
  removeSandboxDefinition(sandboxDataObject: SandboxDefinitionTableData) {
    const index = this.dataSource.data.indexOf(sandboxDataObject);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<SandboxDefinitionTableData>(this.dataSource.data);

    this.sandboxDefinitionSetter.removeSandboxDefinition(sandboxDataObject.sandbox.id);
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
    // TODO: deploy
  }

  /**
   * Creates table data source from sandbox definitions retrieved from a server. Only sandbox definitions where
   * active user is listed as an author are shown
   */
  private createTableDataSource() {
    this.sandboxDefinitionGetter.getSandboxDefsByAuthorId(this.activeUserService.getActiveUser().id)
      .subscribe(sandboxes => {
        const sandboxDataObjects: SandboxDefinitionTableData[] = [];

        sandboxes.forEach((sandbox) => {
          const sandboxDataObject = new SandboxDefinitionTableData();
          sandboxDataObject.sandbox = sandbox;
          this.trainingDefinitionGetter.getTrainingDefsBySandboxDefId(sandbox.id)
            .subscribe(assocTrainings => {
                sandboxDataObject.associatedTrainingDefinitions = assocTrainings;
                sandboxDataObject.canBeRemoved = this.canSandboxBeRemoved(sandbox, assocTrainings);
            });
          sandboxDataObjects.push(sandboxDataObject);
          });
        this.dataSource = new MatTableDataSource(sandboxDataObjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: SandboxDefinitionTableData, filter: string) =>
            data.sandbox.title.toLowerCase().indexOf(filter) !== -1
      });
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
