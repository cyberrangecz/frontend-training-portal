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
/**
 * Component displaying overview of training definitions. Contains buttons for upload and creating new training definitions,
 * table with all training definitions associated with currently logged in user and possible actions for each training definition.
 */
export class TrainingDefinitionOverviewComponent implements OnInit {

  // needed to compare values against enums in a template
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
   * Navigates to training sub route with parameters indicating creation of a new training definition
   */
  newTrainingDefinition() {
    this.router.navigate(['training', { id: null }], { relativeTo: this.activatedRoute })
  }

  /**
   * Displays dialog window to upload a file with training definition and creates alert with a result of the upload
   */
  uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(TrainingUploadDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.designerAlertService.emitAlert(result.type, result.message);
      }
    });
  }

  /**
   * Navigates to training sub route with parameters indicating editing of an existing training definition
   * @param {number} trainingDefId id of a training definition which should be edited
   */
  editTrainingDefinition(trainingDefId: number) {
    this.router.navigate(['training', { id: trainingDefId }], { relativeTo: this.activatedRoute })
  }

  /**
   * Downloads selected training definitions
   * @param {number} id id of training definition which should be downloaded
   */
  downloadTrainingDefinition(id: number) {
    // TODO: Download training definition
  }

  /**
   * Removes training definition from data source and sends request to delete the training in database
   * @param {TrainingDefinition} trainingDef training definition which should be deleted
   */
  removeTrainingDefinition(trainingDef: TrainingDefinition) {
    const index = this.dataSource.data.indexOf(trainingDef);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<TrainingDefinition>(this.dataSource.data);

    this.trainingDefinitionSetter.removeTrainingDefinition(trainingDef.id);
  }

  /**
   * Clones chosen training definition with title of 'Clone of ...' and sets same values of attributes as the original training definition.
   * Sends request to create new cloned training definition in a database
   * @param {TrainingDefinition} trainingDef training definition which should be cloned
   */
  cloneTrainingDefinition(trainingDef: TrainingDefinition) {
    const clone = new TrainingDefinition(
      trainingDef.sandboxDefinitionId,
      trainingDef.authorIds,
      trainingDef.state,
      trainingDef.levels,
    );
    clone.title = 'Clone of ' + trainingDef.title;
    clone.outcomes = trainingDef.outcomes;
    clone.prerequisites = trainingDef.prerequisites;
    clone.description = trainingDef.description;

    this.dataSource.data.push(clone);
    this.dataSource = new MatTableDataSource<TrainingDefinition>(this.dataSource.data);

    this.trainingDefinitionSetter.addTrainingDefinition(clone);
  }

  /**
   * Archives chosen training definition and sends request to edit the training definition in a database
   * @param {TrainingDefinition} trainingDef training definition which should be edited
   */
  archiveTrainingDefinition(trainingDef: TrainingDefinition) {
    trainingDef.state = TrainingDefinitionStateEnum.Archived;
    this.trainingDefinitionSetter.editTrainingDefinition(trainingDef);
  }

  /**
   * Creates table data source from training definitions retrieved from a server. Only training definitions where
   * active user is listed as an author are shown
   */
  private createTableDataSource() {
    this.trainingDefinitionGetter.getTrainingDefsByAuthorId(this.activeUserService.getActiveUser().id)
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
