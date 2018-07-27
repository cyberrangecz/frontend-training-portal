import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {AlertService} from "../../../../services/event-services/alert.service";
import {SandboxUploadDialogComponent} from "./sandbox-upload-dialog/sandbox-upload-dialog.component";
import {SandboxDefinitionSetterService} from "../../../../services/data-setters/sandbox-definition-setter.service";

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

  dataSource: MatTableDataSource<SandboxDefinition>;

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
   * Removes sandbox definition from data source and sends request to delete the sandbox in database
   * @param {SandboxDefinition} sandboxDef sandbox definition which should be deleted
   */
  removeSandboxDefinition(sandboxDef: SandboxDefinition) {
    const index = this.dataSource.data.indexOf(sandboxDef);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<SandboxDefinition>(this.dataSource.data);

    this.sandboxDefinitionSetter.removeSandboxDefinition(sandboxDef.id);
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

        sandboxes.forEach((sandbox) => {
          this.trainingDefinitionGetter.getTrainingDefsBySandboxDefId(sandbox.id)
            .subscribe(assocTrainings =>
              sandbox.associatedTrainingDefs = assocTrainings);
          this.sandboxDefinitionGetter.determineIfSandboxCanBeRemoved(sandbox);
          });

        this.dataSource = new MatTableDataSource(sandboxes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: SandboxDefinition, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
      });
  }

}
