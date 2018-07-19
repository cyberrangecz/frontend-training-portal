import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingUploadDialogComponent} from "./training-upload-dialog/training-upload-dialog.component";
import {AlertService} from "../../../../services/event-services/alert.service";
import {TrainingDefinitionSetterService} from "../../../../services/data-setters/training-definition-setter.service";

@Component({
  selector: 'designer-overview-training-definition',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css']
})
export class TrainingDefinitionOverviewComponent implements OnInit {

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
    private designerAlertService: AlertService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private trainingDefinitionSetter: TrainingDefinitionSetterService) {
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

  newTrainingDefinition() {
    this.router.navigate(['training', { id: null }], { relativeTo: this.activatedRoute })
  }

  uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingUploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.designerAlertService.emitAlertMessage(result.type, result.message);
      }
    });
  }

  editTrainingDefinition(trainingDefId: number) {
    this.router.navigate(['training', { id: trainingDefId }], { relativeTo: this.activatedRoute })
  }

  downloadTrainingDefinition(id: number) {
    // TODO: Download training definition
  }

  removeTrainingDefinition(training: TrainingDefinition) {
    const index = this.dataSource.data.indexOf(training);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<TrainingDefinition>(this.dataSource.data);

    this.trainingDefinitionSetter.removeTrainingDefinition(training.id);
  }

  cloneTrainingDefinition(training: TrainingDefinition) {
    const clone = new TrainingDefinition(
      training.sandboxDefinitionId,
      training.authorIds,
      training.state,
      training.levels,
    );
    clone.title = 'Clone of ' + training.title;
    clone.outcomes = training.outcomes;
    clone.prerequisites = training.prerequisites;
    clone.description = training.description;

    this.dataSource.data.push(clone);
    this.dataSource = new MatTableDataSource<TrainingDefinition>(this.dataSource.data);

    this.trainingDefinitionSetter.addTrainingDefinition(clone);
  }

  archiveTrainingDefinition(training: TrainingDefinition) {
    training.state = TrainingDefinitionStateEnum.Archived;
    this.trainingDefinitionSetter.editTrainingDefinition(training);
  }

  private createTableDataSource() {
    this.trainingDefinitionGetter.getTrainingDefsByUserId(this.activeUserService.getActiveUser().id)
      .subscribe(trainings => {
        trainings.forEach(training =>
          this.trainingDefinitionGetter.determineIfTrainingCanBeArchived(training));

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
