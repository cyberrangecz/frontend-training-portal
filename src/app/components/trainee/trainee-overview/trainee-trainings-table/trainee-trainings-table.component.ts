import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingInstance} from "../../../../model/training/training-instance";
import {TrainingRun} from "../../../../model/training/training-run";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRunGetterService} from "../../../../services/data-getters/training-run-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveUserService} from "../../../../services/active-user.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {TraineeAccessedTrainingsTableDataModel} from "../../../../model/table-models/trainee-accessed-trainings-table-data-model";
import {TraineeAccessTrainingRunActionEnum} from "../../../../enums/trainee-access-training-run-actions.enum";
import {TableDataWithPaginationWrapper} from "../../../../model/table-models/table-data-with-pagination-wrapper";
import {TrainingRunSetterService} from "../../../../services/data-setters/training-run.setter.service";
import {ComponentErrorHandlerService} from "../../../../services/component-error-handler.service";
import {ActiveTrainingRunLevelsService} from "../../../../services/active-training-run-levels.service";

@Component({
  selector: 'trainee-trainings-table',
  templateUrl: './trainee-trainings-table.component.html',
  styleUrls: ['./trainee-trainings-table.component.css']
})
/**
 * Component to display available trainings for trainee in form of a material table
 */
export class TraineeTrainingsTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'date', 'completedLevels', 'actions'];
  dataSource: MatTableDataSource<TraineeAccessedTrainingsTableDataModel>;

  actionType = TraineeAccessTrainingRunActionEnum;
  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;
  now = Date.now();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeLevelsService: ActiveTrainingRunLevelsService,
    private errorHandler: ComponentErrorHandlerService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingRunSetter: TrainingRunSetterService) { }

  ngOnInit() {
    this.initDataSource();
  }

  /**
   * Allocates resources for new sandbox and starts new training run on a first level
   * @param {number} trainingInstanceId id of training instance which should be started
   */
  tryAgain(trainingInstanceId: number) {
    // TODO: Integrate with appropriate REST API call once its resolved
    this.router.navigate(['training/game'], {relativeTo: this.activeRoute});
  }

  /**
   * Navigates to page with results of selected training run
   * @param {number} trainingRunId if of training run which results should be displayed
   */
  accessResults(trainingRunId: number) {
    // TODO: pass id of training run? or use service?
    this.router.navigate(['training/results'],{relativeTo: this.activeRoute})
  }

  resume(trainingRunId: number) {
    this.trainingRunSetter.resume(trainingRunId)
      .subscribe(resp => {
        this.activeLevelsService.setActiveLevels(resp.levels.sort((a, b) => a.order - b.order));
        this.activeLevelsService.setActiveLevel(resp.currentLevel);
        this.router.navigate(['training/game'], {relativeTo: this.activeRoute});
      },
        err => {
        this.errorHandler.displayHttpError(err, "Resuming training run")
        })
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
   * Loads necessary data from endpoint and create data source for the table
   */
  private initDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private fetchData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.trainingRunGetter.getAccessedTrainingRunsWithPagination(this.paginator.pageIndex, this.paginator.pageSize,
            this.resolveSortParam(this.sort.active), this.sort.direction);
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
      ).subscribe((data: TableDataWithPaginationWrapper<TraineeAccessedTrainingsTableDataModel[]>) =>
      this.createDataSource(data.tableData));
  }

  private resolveSortParam(tableHeader: string): string {
    return tableHeader === 'date' ? 'startTime' : tableHeader;
  }

  private createDataSource(data: TraineeAccessedTrainingsTableDataModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: TraineeAccessedTrainingsTableDataModel, filter: string) =>
        data.trainingInstanceTitle.toLowerCase().indexOf(filter) !== -1
  }
}
