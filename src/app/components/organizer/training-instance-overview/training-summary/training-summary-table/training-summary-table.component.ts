import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {AlertService} from "../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
import {TrainingInstanceFacade} from "../../../../../services/facades/training-instance-facade.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {TrainingRunTableAdapter} from "../../../../../model/table-adapters/training-run-table-adapter";
import {PaginatedTable} from "../../../../../model/table-adapters/paginated-table";
import {environment} from "../../../../../../environments/environment";
import {TrainingRunFacade} from "../../../../../services/facades/training-run-facade.service";

@Component({
  selector: 'training-summary-table',
  templateUrl: './training-summary-table.component.html',
  styleUrls: ['./training-summary-table.component.css']
})
/**
 * Component for displaying summary of training in form of a material table
 */
export class TrainingSummaryTableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxInstanceId', 'player', 'state', 'actions'];
  trainingInstance: TrainingInstance;

  activeTrainingSubscription;

  dataSource: MatTableDataSource<TrainingRunTableAdapter>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunFacade: TrainingRunFacade,
    private trainingInstanceFacade: TrainingInstanceFacade) { }

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
  revertTrainingRun(trainingRunTableObject: TrainingRunTableAdapter) {
    trainingRunTableObject.isWaitingForRevertResponse = true;
    this.trainingRunFacade.revert(trainingRunTableObject.trainingRun.id).subscribe(
      response => {
        trainingRunTableObject.isWaitingForRevertResponse = false;
        this.alertService.emitAlert(AlertTypeEnum.Success, 'Training run was successfully reverted');
      },
      err => {
        trainingRunTableObject.isWaitingForRevertResponse = false;
        this.errorHandler.displayInAlert(err, 'Reverting training run');
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
          return this.trainingInstanceFacade.getTrainingRunsByTrainingInstanceIdWithPagination(this.trainingInstance.id,
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
      ).subscribe((data: PaginatedTable<TrainingRunTableAdapter[]>) => this.createDataSource(data.tableData));
  }

  /**
   * Creates data source from fetched data
   * @param data fetched training runs
   */
  private createDataSource(data: TrainingRunTableAdapter[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.filterPredicate =
      (data: TrainingRunTableAdapter, filter: string) =>
        data.trainingRun.state.toLowerCase().indexOf(filter) !== -1
  }

}
