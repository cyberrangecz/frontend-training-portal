import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRun} from "../../../../../model/training/training-run";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {ActiveTrainingInstanceService} from "../../../../../services/active-training-instance.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {TrainingRunSetterService} from "../../../../../services/data-setters/training-run.setter.service";
import {AlertService} from "../../../../../services/event-services/alert.service";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {TrainingInstanceGetterService} from "../../../../../services/data-getters/training-instance-getter.service";
import {ComponentErrorHandlerService} from "../../../../../services/component-error-handler.service";
import {TrainingRunTableDataModel} from "../../../../../model/table-models/training-run-table-data-model";
import {TableDataWithPaginationWrapper} from "../../../../../model/table-models/table-data-with-pagination-wrapper";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'training-summary-table',
  templateUrl: './training-summary-table.component.html',
  styleUrls: ['./training-summary-table.component.css']
})
/**
 * Component for displaying summary of training in form of a material table
 */
export class TrainingSummaryTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxId', 'playerId', 'state', 'actions'];
  trainingInstance: TrainingInstance;

  activeTrainingSubscription;

  dataSource: MatTableDataSource<TrainingRunTableDataModel>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private errorHandler: ComponentErrorHandlerService,
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunSetter: TrainingRunSetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService) { }

  ngOnInit() {
    this.loadActiveTraining();
    this.subscribeActiveTrainingChanges();
    this.initDataSource();
  }

  ngOnDestroy() {
    if (this.activeTrainingSubscription) {
      this.activeTrainingSubscription.unsubscribe();
    }
  }

  /**
   * Loads active training (selected by user) from service
   */
  private loadActiveTraining() {
    this.trainingInstance = this.activeTrainingInstanceService.getActiveTrainingInstance();
  }

  /**
   * Subscribes to changes of active training. If active training is changes, reloads data and creates new data source
   */
  private subscribeActiveTrainingChanges() {
    this.activeTrainingSubscription = this.activeTrainingInstanceService.onActiveTrainingChanged
      .subscribe(change => {
        this.loadActiveTraining();
        this.fetchData();
      })
  }

  /**
   * Reverts selected training run
   * @param trainingRunTableObject table object of training run
   */
  revertTrainingRun(trainingRunTableObject: TrainingRunTableDataModel) {
    trainingRunTableObject.isWaitingForRevertResponse = true;
    this.trainingRunSetter.revert(trainingRunTableObject.trainingRun.id).subscribe(
      response => {
        trainingRunTableObject.isWaitingForRevertResponse = false;
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Training run was successfully reverted');
      },
      err => {
        trainingRunTableObject.isWaitingForRevertResponse = false;
        this.errorHandler.displayHttpError(err, 'Reverting training run');
      }
    )
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
   * Creates table data source from training runs retrieved from a server.
   */
  private initDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'id';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetch data from server
   */
  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.trainingInstanceGetter.getTrainingRunsByTrainingInstanceIdWithPagination(this.trainingInstance.id,
            this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction)
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe((data: TableDataWithPaginationWrapper<TrainingRunTableDataModel[]>) => this.createDataSource(data.tableData));
  }

  /**
   * Creates data source from fetched data
   * @param data fetched training runs
   */
  private createDataSource(data: TrainingRunTableDataModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.filterPredicate =
      (data: TrainingRunTableDataModel, filter: string) =>
        data.trainingRun.state.toLowerCase().indexOf(filter) !== -1
  }

}
