import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import {ActiveUserService} from '../../../../services/shared/active-user.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TrainingDefinitionStateEnum} from '../../../../model/enums/training-definition-state.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {DesignerUploadDialogComponent} from '../../upload-dialog/designer-upload-dialog.component';
import {AlertService} from '../../../../services/shared/alert.service';
import {TrainingInstanceFacade} from '../../../../services/facades/training-instance-facade.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {TrainingDefinitionTableAdapter} from '../../../../model/table-adapters/training-definition-table-adapter';
import {PaginatedTable} from '../../../../model/table-adapters/paginated-table';
import {HttpErrorResponse} from '@angular/common/http';
import {StateChangeDialogComponent} from './state-change-dialog/state-change-dialog.component';
import {DeleteDialogComponent} from "../../../shared/delete-dialog/delete-dialog.component";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {AuthorsListDialogComponent} from './authors-list-dialog/authors-list-dialog.component';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {CloneDialogComponent} from "./clone-dialog/clone-dialog.component";

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
  loggedUserLogin: string;
  displayedColumns: string[] = ['title', 'description', 'state', 'authors', 'estimated-duration', 'last-edit', 'actions'];

  dataSource: MatTableDataSource<TrainingDefinitionTableAdapter>;

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
    this.loggedUserLogin = this.activeUserService.getActiveUser().login
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
    this.router.navigate(['training', trainingDefId], {relativeTo: this.activatedRoute});
  }


  previewTrainingDefinition(id: number) {
    this.router.navigate(['training', id, 'preview'], {relativeTo: this.activatedRoute});
  }

  /**
   * Downloads selected training definitions
   * @param {number} id id of training definition which should be downloaded
   */
  downloadTrainingDefinition(id: number) {
    this.trainingDefinitionFacade.downloadTrainingDefinition(id)
      .subscribe(resp => {},
        err => {
        if (err.status === 406) {
          this.alertService.emitAlert(AlertTypeEnum.Error, 'Training definition could not be downloaded');
        }
        this.errorHandler.displayHttpError(err, 'Downloading training definition');
        this.isLoadingResults = false;
      });
  }

  /**
   * Calls service to delete the training definition
   * @param {TrainingDefinition} trainingDefinition training definition which should be deleted
   */
  deleteTrainingDefinition(trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        type: 'Training Definition',
        title: trainingDefinition.title
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result && result.type === 'confirm')
          this.sendRequestToDeleteTrainingDefinition(trainingDefinition.id)
      });
  }


  cloneTrainingDefinition(trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(CloneDialogComponent, {
      data: trainingDefinition
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result.type === 'confirm') {
          this.sendRequestToCloneTrainingDefinition(trainingDefinition.id, result.title);
        }
      }
    );
  }


  changeTrainingDefinitionState(row: TrainingDefinitionTableAdapter) {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {
      data: {
        fromState: row.trainingDefinition.state,
        toState: row.selectedState
      }
    });

    dialogRef.afterClosed().subscribe(result => this.onChangeTrainingStateDialogC(row, result));
  }

  showAuthorsList(trainingDefinition: TrainingDefinition) {
    this.dialog.open(AuthorsListDialogComponent, {
      data: {
        authors: trainingDefinition.authors,
        trainingDefinition: trainingDefinition
      }
    })
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
      ).subscribe((data: PaginatedTable<TrainingDefinitionTableAdapter[]>) => this.createDataSource(data));
  }

  private onChangeTrainingStateDialogC(row: TrainingDefinitionTableAdapter, result) {
    if (result && result.type === 'confirm') {
      this.sendChangeTrainingDefinitionStateRequest(row);
    }
    else {
      row.selectedState = row.trainingDefinition.state;
    }
  }

  private sendChangeTrainingDefinitionStateRequest(row: TrainingDefinitionTableAdapter) {
    row.isLoadingStateChange = true;
    this.trainingDefinitionFacade.changeTrainingDefinitionState(row.selectedState, row.trainingDefinition.id)
      .subscribe(
        resp => this.onTrainingDefinitionStateChangeConfirmedByServer(row),
        err => this.onTrainingDefinitionStateChangeDeniedByServer(row, err)
      )
  }

  private onTrainingDefinitionStateChangeConfirmedByServer(row: TrainingDefinitionTableAdapter) {
    row.isLoadingStateChange = false;
    row.trainingDefinition.state = row.selectedState;
    row.createPossibleStates();
  }

  private onTrainingDefinitionStateChangeDeniedByServer(row: TrainingDefinitionTableAdapter, err: HttpErrorResponse) {
    row.isLoadingStateChange = false;
    row.selectedState = row.trainingDefinition.state;
    this.errorHandler.displayHttpError(err, 'Changing state of training definition');
  }

  private sendRequestToCloneTrainingDefinition(id: number, title: string) {
    this.trainingDefinitionFacade.cloneTrainingDefinition(id, title)
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully cloned.');
          this.fetchData();
        },
        err => this.errorHandler.displayHttpError(err, 'Cloning training definition'));
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

  private sendRequestToDeleteTrainingDefinition(id: number) {
    this.trainingDefinitionFacade.deleteTrainingDefinition(id)
      .subscribe(resp => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully deleted');
          this.fetchData();
        },
        err => {
          this.errorHandler.displayHttpError(err, 'Removing training definition');
        });
  }

  /**
   * Creates table data source from fetched data
   * @param data Training Definitions fetched from server
   */
  private createDataSource(data: PaginatedTable<TrainingDefinitionTableAdapter[]>) {
    this.dataSource = new MatTableDataSource(data.tableData);
    this.dataSource.filterPredicate =
      (data: TrainingDefinitionTableAdapter, filter: string) =>
        data.trainingDefinition.title.toLowerCase().indexOf(filter) !== -1
        || data.trainingDefinition.state.toLowerCase().indexOf(filter) !== -1;
  }


}
