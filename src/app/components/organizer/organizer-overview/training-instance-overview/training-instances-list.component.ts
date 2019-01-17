import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingInstance} from "../../../../model/training/training-instance";
import {AlertService} from "../../../../services/event-services/alert.service";
import {ActiveUserService} from "../../../../services/active-user.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {TrainingEditPopupComponent} from "./training-edit-popup/training-edit-popup.component";
import {TrainingDeleteDialogComponent} from "./training-delete-dialog/training-delete-dialog.component";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {TrainingInstanceSetterService} from "../../../../services/data-setters/training-instance-setter.service";
import {environment} from "../../../../../environments/environment";
import {AlertTypeEnum} from "../../../../enums/alert-type.enum";
import {TrainingInstanceTableDataModel} from "../../../../model/table-models/training-instance-table-data-model";
import {TableDataWithPaginationWrapper} from "../../../../model/table-models/table-data-with-pagination-wrapper";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";

@Component({
  selector: 'training-instances-list',
  templateUrl: './training-instances-list.component.html',
  styleUrls: ['./training-instances-list.component.css']
})

/**
 * Component for list of training instance displayed in form of a table. Only training instances where the active user is listed as an organizer is shown
 */
export class TrainingInstancesListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'trainingDefinition', 'poolSize', 'accessToken', 'actions'];

  dataSource: MatTableDataSource<TrainingInstanceTableDataModel>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  now: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private activeUserService: ActiveUserService,
    private trainingInstanceGetter: TrainingInstanceGetterService,
    private trainingInstanceSetter: TrainingInstanceSetterService
  ) { }

  ngOnInit() {
    this.now = Date.now();
    this.initTableDataSource();
  }

  /**
   * Reloads data and creates new table data source
   */
  refreshData() {
    this.now = Date.now();
    this.fetchData();
  }

  /**
   * Opens popup dialog with component for editing existing training instance
   * @param {TrainingInstance} training training instance which should be edited
   */
  editTraining(training: TrainingInstance) {
    const dialogRef = this.dialog.open(TrainingEditPopupComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.refreshData();
      }
    });
  }

  /**
   * Opens popup dialog to confirm if the user really wants to delete the training instance. If the action is
   * confirmed, training instance is removed and REST API called to remove training from endpoint
   * @param {TrainingInstanceTableDataModel} training training instance which should be removed
   */
  removeTraining(training: TrainingInstanceTableDataModel) {
    const dialogRef = this.dialog.open(TrainingDeleteDialogComponent, {
      data: training
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.trainingInstanceSetter.removeTrainingInstance(training.trainingInstance.id)
          .subscribe(response => {
            this.alertService.emitAlert(AlertTypeEnum.Success, 'Training instance was successfully removed.');
            this.fetchData();
          },
            (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Training instance was not removed')
          );
      }
    });
  }

  /**
   *
   * @param {number} id
   */
  archiveTraining(id: number) {
    // TODO: call rest to download all training instances data
    this.trainingInstanceGetter.downloadTrainingInstance(id)
  }

  /**
   *
   * @param trainingInstanceId Id of training instance for which should sanboxes be allocated
   */
  allocateTrainingInstanceSandboxes(trainingInstanceId: number) {
    this.trainingInstanceSetter.allocateSandboxesForTrainingInstance(trainingInstanceId)
      .subscribe(response => {
        this.alertService.emitAlert(AlertTypeEnum.Info, 'Allocation of sandboxes for selected training instance have begun.');
        // TODO: change state or bool so the allocation could not be requested again
      },
        (err) => this.alertService.emitAlert(AlertTypeEnum.Error, 'Could not reach remote server. Allocation have not begun.')
      );
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
   * Creates table data source from training instances retrieved from a server. Only training instances where
   * active user is listed as an organizer are shown
   */
  private initTableDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'title';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetches data from the server
   */
  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.trainingInstanceGetter.getTrainingInstancesWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          this.errorHandler.displayHttpError(err, 'Loading training definitions');
          return of([]);
        })
      ).subscribe((data: TableDataWithPaginationWrapper<TrainingInstanceTableDataModel[]>) => this.createDataSource(data));
  }
  /**
   * Creates data source from fetched data
   * @param data fetched data
   */
  private createDataSource(data: TableDataWithPaginationWrapper<TrainingInstanceTableDataModel[]>) {
    this.dataSource = new MatTableDataSource(data.tableData);
    this.dataSource.filterPredicate =
      (data: TrainingInstanceTableDataModel, filter: string) =>
        data.trainingInstance.title.toLowerCase().indexOf(filter) !== -1;
  }
}
