import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionLoaderService} from "../../../services/data-loaders/training-definition-loader.service";
import {TrainingDefinition} from "../../../model/training/training-definition";
import {ActiveUserService} from "../../../services/active-user.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingDefinitionStateEnum} from "../../../enums/training-definition-state.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingUploadDialogComponent} from "./training-upload-dialog/training-upload-dialog.component";
import {DesignerAlertService} from "../../../services/event-services/designer-alert.service";

@Component({
  selector: 'designer-training-definition',
  templateUrl: './training-definition.component.html',
  styleUrls: ['./training-definition.component.css']
})
export class TrainingDefinitionComponent implements OnInit {

  // needed to compare against enums in template
  trainingStateEnum = TrainingDefinitionStateEnum;

  displayedColumns: string[] = ['title', 'description', 'status', 'authors', 'actions'];

  dataSource: MatTableDataSource<TrainingDefinition>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private activeUserService: ActiveUserService,
    private designerAlertService: DesignerAlertService,
    private trainingDefinitionLoader: TrainingDefinitionLoaderService) {
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

  newTrainingDefinition() {
    this.router.navigate(['trainings/new'], {relativeTo: this.activatedRoute})
  }

  uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingUploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.designerAlertService.emitAlertMessage(result.type, result.message);
      }
    });
  }

  editTrainingDefinition(id: number) {
    console.log(id);

  }

  downloadTrainingDefinition(id: number) {
    console.log(id);

  }

  removeTrainingDefinition(id: number) {
    console.log(id);
  }

  cloneTrainingDefinition(id: number) {
    console.log(id);
  }

  archiveTrainingDefinition(id: number) {
    console.log(id);
  }

  private createTableDataSource() {
    this.trainingDefinitionLoader.getTrainingDefsByUserId(this.activeUserService.getActiveUser().id)
      .subscribe(trainings => {

        this.dataSource = new MatTableDataSource(trainings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingDefinition, filter: string) =>
            data.title.toLowerCase().indexOf(filter) !== -1
            || data.state.toLowerCase().indexOf(filter) !== -1;
      });
  }

}
