import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {ActiveUserService} from '../../../../services/active-user.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TrainingDefinitionStateEnum} from '../../../../enums/training-definition-state.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {DesignerUploadDialogComponent} from '../../upload-dialog/designer-upload-dialog.component';
import {AlertService} from '../../../../services/event-services/alert.service';
import {TrainingInstanceFacade} from '../../../../services/facades/training-instance-facade.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {AlertTypeEnum} from '../../../../enums/alert-type.enum';
import {ErrorHandlerService} from '../../../../services/error-handler.service';
import {TrainingDefinitionTableDataModel} from '../../../../model/table-models/training-definition-table-data-model';
import {TableDataWithPaginationWrapper} from '../../../../model/table-models/table-data-with-pagination-wrapper';

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

  dataSource: MatTableDataSource<TrainingDefinitionTableDataModel>;

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
    private errorHandler: ErrorHandlerService,
    private trainingInstanceFacade: TrainingInstanceFacade,
    private trainingDefinitionFacade: TrainingDefinitionFacade) {
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
    const dialogRef = this.dialog.open(DesignerUploadDialogComponent, {
      data: {
        title: 'Upload Training Definition',
        type: 'training'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.emitAlert(result.type, result.message);
      }
      if (result && result.type === AlertTypeEnum.Success) {
        this.fetchData();
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
    this.isLoadingResults = true;
    this.trainingDefinitionFacade.downloadTrainingDefinition(id)
      .subscribe(resp => this.isLoadingResults = false,
        err => {
        this.errorHandler.displayHttpError(err, 'Downloading training definition');
        this.isLoadingResults = false;
      });
  }

  /**
   * Calls service to delete the training definition
   * @param {number} id training definition which should be deleted
   */
  removeTrainingDefinition(id: number) {
    this.trainingDefinitionFacade.removeTrainingDefinition(id)
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
    this.trainingDefinitionFacade.cloneTrainingDefinition(id)
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
    this.trainingDefinitionFacade.updateTrainingDefinition(trainingDef)
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
          return this.trainingDefinitionFacade.getTrainingDefinitionsWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayHttpError(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe((data: TableDataWithPaginationWrapper<TrainingDefinitionTableDataModel[]>) => this.createDataSource(data));
  }

  /**
   * Creates table data source from fetched data
   * @param data Training Definitions fetched from server
   */
  private createDataSource(data: TableDataWithPaginationWrapper<TrainingDefinitionTableDataModel[]>) {
    this.dataSource = new MatTableDataSource(data.tableData);
    this.dataSource.filterPredicate =
      (data: TrainingDefinitionTableDataModel, filter: string) =>
        data.trainingDefinition.title.toLowerCase().indexOf(filter) !== -1
        || data.trainingDefinition.state.toLowerCase().indexOf(filter) !== -1;
  }
}
