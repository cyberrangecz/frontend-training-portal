import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingDefinitionFacade} from '../../../../services/facades/training-definition-facade.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {TrainingDefinitionStateEnum} from '../../../../model/enums/training-definition-state.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDefinitionUploadDialogComponent} from './training-definition-upload-dialog/training-definition-upload-dialog.component';
import {AlertService} from '../../../../services/shared/alert.service';
import {TrainingInstanceFacade} from '../../../../services/facades/training-instance-facade.service';
import {catchError, map, startWith, switchMap, takeWhile} from 'rxjs/operators';
import {merge, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {AlertTypeEnum} from '../../../../model/enums/alert-type.enum';
import {TrainingDefinitionTableRow} from '../../../../model/table-adapters/training-definition-table-row';
import {PaginatedTable} from '../../../../model/table-adapters/paginated-table';
import {HttpErrorResponse} from '@angular/common/http';
import {StateChangeDialogComponent} from './state-change-dialog/state-change-dialog.component';
import {ActionConfirmationDialog} from "../../../shared/delete-dialog/action-confirmation-dialog.component";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {AuthorsListDialogComponent} from './authors-list-dialog/authors-list-dialog.component';
import {ErrorHandlerService} from '../../../../services/shared/error-handler.service';
import {CloneDialogComponent} from "./clone-dialog/clone-dialog.component";
import {Kypo2AuthService, User} from 'kypo2-auth';
import {BaseComponent} from "../../../base.component";
import {StringNormalizer} from "../../../../model/utils/ignore-diacritics-filter";

@Component({
  selector: 'designer-overview-training-definition',
  templateUrl: './training-definition-overview.component.html',
  styleUrls: ['./training-definition-overview.component.css']
})
/**
 * Component displaying overview of training definitions. Contains buttons for upload and creating new training definitions,
 * table with all training definitions associated with currently logged in user and possible actions for each training definition.
 */
export class TrainingDefinitionOverviewComponent extends BaseComponent implements OnInit {

  // needed to compare values against enums in a template
  trainingStateEnum = TrainingDefinitionStateEnum;
  activeUser: User;
  displayedColumns: string[] = ['title', 'description', 'state', 'authors', 'estimated-duration', 'last-edit', 'actions'];

  dataSource: MatTableDataSource<TrainingDefinitionTableRow>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private authService: Kypo2AuthService,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService,
              private trainingInstanceFacade: TrainingInstanceFacade,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
    super();
  }

  ngOnInit() {
    this.initTableDataSource();
    this.activeUser = this.authService.getActiveUser()
  }

  /**
   * Applies filter data source
   * @param {string} filterValue value by which the data should be filtered. Inserted by user
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = StringNormalizer.normalizeDiacritics(filterValue.trim().toLowerCase());
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
    const dialogRef = this.dialog.open(TrainingDefinitionUploadDialogComponent, {
      data: {
        title: 'Upload Training Definition',
        type: 'training'
      }
    });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
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
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {},
        err => {
        if (err.status === 406) {
          this.alertService.emitAlert(AlertTypeEnum.Error, 'Training definition could not be downloaded');
        }
        this.errorHandler.displayInAlert(err, 'Downloading training definition');
        this.isLoadingResults = false;
      });
  }

  /**
   * Calls service to delete the training definition
   * @param {TrainingDefinition} trainingDefinition training definition which should be deleted
   */
  deleteTrainingDefinition(trainingDefinition: TrainingDefinition) {
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'Training Definition',
        action: 'delete',
        title: trainingDefinition.title
      }
    });
    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
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
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
        if (result.type === 'confirm') {
          this.sendRequestToCloneTrainingDefinition(trainingDefinition.id, result.title);
        }
      }
    );
  }


  changeTrainingDefinitionState(row: TrainingDefinitionTableRow) {
    const dialogRef = this.dialog.open(StateChangeDialogComponent, {
      data: {
        fromState: row.trainingDefinition.state,
        toState: row.selectedState
      }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => this.onChangeTrainingStateDialogC(row, result));
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
    let timeoutHandle = 0;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeWhile(() => this.isAlive),
        startWith({}),
        switchMap(() => {
          timeoutHandle =  window.setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingDefinitionFacade.getTrainingDefinitionsPaginated({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sort: this.sort.active,
            sortDir: this.sort.direction
          });
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError((err) => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayInAlert(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe((data: PaginatedTable<TrainingDefinitionTableRow[]>) => this.createDataSource(data));
  }

  private onChangeTrainingStateDialogC(row: TrainingDefinitionTableRow, result) {
    if (result && result.type === 'confirm') {
      this.sendChangeTrainingDefinitionStateRequest(row);
    }
    else {
      row.selectedState = row.trainingDefinition.state;
    }
  }

  private sendChangeTrainingDefinitionStateRequest(row: TrainingDefinitionTableRow) {
    row.isLoadingStateChange = true;
    this.trainingDefinitionFacade.changeTrainingDefinitionState(row.selectedState, row.trainingDefinition.id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resp => this.onTrainingDefinitionStateChangeConfirmedByServer(row),
        err => this.onTrainingDefinitionStateChangeDeniedByServer(row, err)
      )
  }

  private onTrainingDefinitionStateChangeConfirmedByServer(row: TrainingDefinitionTableRow) {
    row.isLoadingStateChange = false;
    row.trainingDefinition.state = row.selectedState;
    row.createPossibleStates();
  }

  private onTrainingDefinitionStateChangeDeniedByServer(row: TrainingDefinitionTableRow, err: HttpErrorResponse) {
    row.isLoadingStateChange = false;
    row.selectedState = row.trainingDefinition.state;
    this.errorHandler.displayInAlert(err, 'Changing state of training definition');
  }

  private sendRequestToCloneTrainingDefinition(id: number, title: string) {
    this.trainingDefinitionFacade.cloneTrainingDefinition(id, title)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(response => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training was successfully cloned.');
          this.fetchData();
        },
        err => this.errorHandler.displayInAlert(err, 'Cloning training definition'));
  }

  /**
   * Creates table data source from training definitions retrieved from a server. Only training definitions where
   * active user is listed as an author are shown
   */
  private initTableDataSource() {
    this.sort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'lastEdited';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private sendRequestToDeleteTrainingDefinition(id: number) {
    this.trainingDefinitionFacade.deleteTrainingDefinition(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(resp => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Training definition was successfully deleted');
          this.fetchData();
        },
        err => {
          this.errorHandler.displayInAlert(err, 'Removing training definition');
        });
  }

  /**
   * Creates table data source from fetched data
   * @param data Training Definitions fetched from server
   */
  private createDataSource(data: PaginatedTable<TrainingDefinitionTableRow[]>) {
    this.dataSource = new MatTableDataSource(data.tableData);
    this.dataSource.filterPredicate =
      (data: TrainingDefinitionTableRow, filter: string) =>
        data.normalizedTitle.indexOf(filter) !== -1
        || data.normalizedState.indexOf(filter) !== -1;
  }
}
