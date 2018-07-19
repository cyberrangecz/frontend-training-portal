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
export class SandboxDefinitionOverviewComponent implements OnInit {

  displayedColumns: string[] = ['title', 'associatedTrainingDefs', 'authors', 'actions'];

  dataSource: MatTableDataSource<SandboxDefinition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private designerAlertService: AlertService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private sandboxDefinitionGetter: SandboxDefinitionGetterService,
    private sandboxDefinitionSetter: SandboxDefinitionSetterService
  ) {
  }

  ngOnInit() {
    this.createTableDataSource();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  uploadSandboxDefinition() {
    const dialogRef = this.dialog.open(SandboxUploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.designerAlertService.emitAlert(result.type, result.message);
      }
    });
  }

  removeSandboxDefinition(sandbox: SandboxDefinition) {
    const index = this.dataSource.data.indexOf(sandbox);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<SandboxDefinition>(this.dataSource.data);

    this.sandboxDefinitionSetter.removeSandboxDefinition(sandbox.id);
  }

  updateSandboxDefinition(id: number) {
    // TODO: replace original file with the new one
    this.uploadSandboxDefinition();
  }

  deploySandboxDefinition(id: number) {
    // TODO: deploy
  }

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
