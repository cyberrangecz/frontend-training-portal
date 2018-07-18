import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SandboxDefinition} from "../../../../model/sandbox/sandbox-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {SandboxDefinitionGetterService} from "../../../../services/data-getters/sandbox-definition-getter.service";
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {DesignerAlertService} from "../../../../services/event-services/designer-alert.service";
import {SandboxUploadDialogComponent} from "./sandbox-upload-dialog/sandbox-upload-dialog.component";

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
    private designerAlertService: DesignerAlertService,
    private activeUserService: ActiveUserService,
    private trainingDefinitionLoader: TrainingDefinitionGetterService,
    private sandboxDefinitionLoader: SandboxDefinitionGetterService
  ) {
    this.createTableDataSource();
  }

  ngOnInit() {
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
        this.designerAlertService.emitAlertMessage(result.type, result.message);
      }
    });
  }

  removeSandboxDefinition(id: number) {
  }

  updateSandboxDefinition(id: number) {
  }

  deploySandboxDefinition(id: number) {
  }

  private createTableDataSource() {
    this.sandboxDefinitionLoader.getSandboxDefsByUserId(this.activeUserService.getActiveUser().id)
      .subscribe(sandboxes => {
        this.dataSource = new MatTableDataSource(sandboxes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingDefinition, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
      });
  }

}
