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
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {merge, of} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";

export class TrainingDefinitionTableDataObject {
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

  dataSource: MatTableDataSource<TrainingDefinitionTableDataObject>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private activeUserService: ActiveUserService,
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private trainingDefinitionGetter: TrainingDefinitionGetterService,
    private trainingDefinitionSetter: TrainingDefinitionSetterService) {
  }

  ngOnInit() {
    this.initTableDataSource();
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
    this.router.navigate(['training/new'], {relativeTo: this.activatedRoute})
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
        this.alertService.emitAlert(result.type, result.message);
      }
    });
  }

  /**
   * Navigates to training sub route with parameters indicating editing of an existing training definition
   * @param {number} trainingDefId id of a training definition which should be edited
   */
  editTrainingDefinition(trainingDefId: number) {
    this.router.navigate(['training', trainingDefId], {relativeTo: this.activatedRoute})
  }

  /**
   * Downloads selected training definitions
   * @param {number} id id of training definition which should be downloaded
   */
  downloadTrainingDefinition(id: number) {
    this.trainingDefinitionGetter.downloadTrainingDefinition(id);
  }

  /**
   * Calls service to delete the training definition
   * @param {number} id training definition which should be deleted
   */
  removeTrainingDefinition(id: number) {
    this.trainingDefinitionSetter.removeTrainingDefinition(id)
      .subscribe(resp => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully deleted');
        this.fetchData();
      },
        err => {
          this.errorHandler.displayHttpError(err, 'Removing training definition');
        });
  }

  /**
   * Calls service to create clone of the training definition and refreshes the table
   * @param {number} id id of training definition which should be cloned
   */
  cloneTrainingDefinition(id: number) {
    this.trainingDefinitionSetter.cloneTrainingDefinition(id)
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully cloned.');
          this.fetchData();
        },
        err => this.errorHandler.displayHttpError(err, 'Cloning training definition'));
  }

  /**
   * Archives chosen training definition and sends request to edit the training definition in a database
   * @param {TrainingDefinition} trainingDef training definition which should be edited
   */
  archiveTrainingDefinition(trainingDef: TrainingDefinition) {
    const tempState = trainingDef.state;
    trainingDef.state = TrainingDefinitionStateEnum.Archived;
    this.trainingDefinitionSetter.updateTrainingDefinition(trainingDef)
      .subscribe(response => {
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully archived.');
        this.fetchData();
        },
          err => {
            trainingDef.state = tempState;
            this.errorHandler.displayHttpError(err, 'Archiving training definition');
      }
      );
  }

  /**
   * Creates table data source from training definitions retrieved from a server. Only training definitions where
   * active user is listed as an author are shown
   */
  private initTableDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'title';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetches data from the server and maps them to table data objects
   */
  fetchData() {
    this.isInErrorState = false;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.trainingDefinitionGetter.getTrainingDefinitionssWithPaginations(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;

          return this.mapTrainingDefinitionsToTableObjects(data);
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayHttpError(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe(data => this.createDataSource(data));
  }

  /**
   * Creates table data source from fetched data
   * @param data Training Definitions fetched from server
   */
  private createDataSource(data: TrainingDefinitionTableDataObject[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: TrainingDefinitionTableDataObject, filter: string) =>
        data.trainingDefinition.title.toLowerCase().indexOf(filter) !== -1
        || data.trainingDefinition.state.toLowerCase().indexOf(filter) !== -1;
  }

  /**
   * Maps training definition object to data object displayed in a table
   * @param trainings array of training definitions
   * @returns array of mapped training definition table data objects
   */
  private mapTrainingDefinitionsToTableObjects(trainings: TrainingDefinition[]): TrainingDefinitionTableDataObject[] {
    const result: TrainingDefinitionTableDataObject[] = [];
    trainings.forEach(training => {
      const trainingDataObject = new TrainingDefinitionTableDataObject();
      trainingDataObject.trainingDefinition = training;
      this.canTrainingBeArchived(training).subscribe(result => trainingDataObject.canBeArchived = result);

      result.push(trainingDataObject);
    });
    return result;
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
