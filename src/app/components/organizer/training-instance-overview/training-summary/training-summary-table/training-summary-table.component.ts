import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRun} from "../../../../../model/training/training-run";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {ActiveTrainingInstanceService} from "../../../../../services/active-training-instance.service";
import {TrainingRunGetterService} from "../../../../../services/data-getters/training-run-getter.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {TrainingRunSetterService} from "../../../../../services/data-setters/training-run.setter.service";

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

  dataSource: MatTableDataSource<TrainingRun>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activeTrainingInstanceService: ActiveTrainingInstanceService,
    private trainingRunSetter: TrainingRunSetterService,
    private trainingRunGetter: TrainingRunGetterService) { }

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
   *
   * @param {number} id
   */
  revertTrainingRun(id: number) {
    this.trainingRunSetter.revert(id);
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
          return this.trainingRunGetter.getTrainingRunsByTrainingInstanceId(this.trainingInstance.id)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe(data => this.createDataSource(data));
  }

  /**
   * Creates data source from fetched data
   * @param data fetched training runs
   */
  private createDataSource(data: TrainingRun[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: TrainingRun, filter: string) =>
        data.state.toLowerCase().indexOf(filter) !== -1
  }

}
