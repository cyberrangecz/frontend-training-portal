import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionGetterService} from "../../../../services/data-getters/training-definition-getter.service";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {ActiveUserService} from "../../../../services/active-user.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingDefinitionStateEnum} from "../../../../enums/training-definition-state.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadDialogComponent} from "../../../shared/upload-dialog/upload-dialog.component";
import {AlertService} from "../../../../services/event-services/alert.service";
import {TrainingDefinitionSetterService} from "../../../../services/data-setters/training-definition-setter.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

export class TrainingDefinitionDataObject {
  trainingDefinition: TrainingDefinition;
  canBeArchived: boolean;
}

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

  dataSource: MatTableDataSource<TrainingDefinitionDataObject>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private activeUserService: ActiveUserService,
    private designerAlertService: AlertService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
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
    this.router.navigate(['training/new'], { relativeTo: this.activatedRoute })
  }

  /**
   * Displays dialog window to upload a file with training definition and creates alert with a result of the upload
   */
  uploadTrainingDefinition() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        title: 'Upload Training Definition',
        type: 'training'
      }
    });
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
    this.router.navigate(['training', trainingDefId], { relativeTo: this.activatedRoute })
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
  removeTrainingDefinition(trainingDefDataObject: TrainingDefinitionDataObject) {
    const index = this.dataSource.data.indexOf(trainingDefDataObject);
    if (index > -1) {
      this.dataSource.data.splice(index,1);
    }
    this.dataSource = new MatTableDataSource<TrainingDefinitionDataObject>(this.dataSource.data);

    this.trainingDefinitionSetter.removeTrainingDefinition(trainingDefDataObject.trainingDefinition.id);
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
      TrainingDefinitionStateEnum.Unreleased,
      trainingDef.levels,
    );
    clone.title = 'Clone of ' + trainingDef.title;
    clone.outcomes = trainingDef.outcomes;
    clone.prerequisites = trainingDef.prerequisites;
    clone.description = trainingDef.description;
    clone.state = TrainingDefinitionStateEnum.Unreleased;

    this.trainingDefinitionSetter.addTrainingDefinition(clone);

    const cloneDataObject = new TrainingDefinitionDataObject();
    cloneDataObject.trainingDefinition = clone;
    cloneDataObject.canBeArchived = false;

    this.dataSource.data.push(cloneDataObject);
    this.dataSource = new MatTableDataSource<TrainingDefinitionDataObject>(this.dataSource.data);

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
        const trainingDefinitionDataObjects: TrainingDefinitionDataObject[] = [];

        trainings.forEach(training => {
          const trainingDefinitionDataObject = new TrainingDefinitionDataObject();
          trainingDefinitionDataObject.trainingDefinition = training;
          this.canTrainingBeArchived(training).subscribe(result =>
            trainingDefinitionDataObject.canBeArchived = result);
          trainingDefinitionDataObjects.push(trainingDefinitionDataObject);
        });

        this.dataSource = new MatTableDataSource(trainingDefinitionDataObjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate =
          (data: TrainingDefinitionDataObject, filter: string) =>
            data.trainingDefinition.title.toLowerCase().indexOf(filter) !== -1
            || data.trainingDefinition.state.toLowerCase().indexOf(filter) !== -1;
      });
  }


  /**
   * Determines if training can be archived (no training instance associated with the definition is running or scheduled to run in a future)
   * @param {TrainingDefinition} trainingDef training definition which ability to be archives should be determined
   * @returns {Observable<boolean>} true if can be archived, false otherwise
   */
 private canTrainingBeArchived(trainingDef: TrainingDefinition): Observable<boolean> {
  return this.trainingInstanceGetter.getTrainingInstancesByTrainingDefinitionId(trainingDef.id)
    .pipe(map((trainingInstances) => {
      return trainingInstances.every(trainingInstance =>
        (trainingInstance.startTime.valueOf() <= Date.now()
          && trainingInstance.endTime.valueOf() <= Date.now()))
    }));
  }
}
