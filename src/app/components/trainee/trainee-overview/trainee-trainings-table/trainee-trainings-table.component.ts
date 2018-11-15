import {Component, OnInit, ViewChild} from '@angular/core';
import {TrainingInstance} from "../../../../model/training/training-instance";
import {TrainingRun} from "../../../../model/training/training-run";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRunGetterService} from "../../../../services/data-getters/training-run-getter.service";
import {TrainingInstanceGetterService} from "../../../../services/data-getters/training-instance-getter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveUserService} from "../../../../services/active-user.service";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";

export class TraineeAccessedTrainingsTableDataObject {
  totalLevels: number;
  trainingRun: TrainingRun;
  trainingInstance: TrainingInstance;
}

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

  now: number = Date.now();
  dataSource: MatTableDataSource<TraineeAccessedTrainingsTableDataObject>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeUserService: ActiveUserService,
    private trainingRunGetter: TrainingRunGetterService,
    private trainingInstanceGetter: TrainingInstanceGetterService) { }

  ngOnInit() {
    this.initDataSource();
  }

  /**
   * Allocates resources for new sandbox and starts new training run on a first level
   * @param {TrainingInstance} trainingInstance training instance which should be started
   */
  tryAgain(trainingInstance: TrainingInstance) {
    // TODO: allocate new sandbox etc and get ID of training run
    const trainingRunId = 1;
    const firstLevel = 1;
    this.router.navigate(['training', trainingRunId, 'level', firstLevel], {relativeTo: this.activeRoute});
  }

  /**
   * Navigates to page with results of selected training run
   * @param {TrainingRun} trainingRun training run which results should be displayed
   */
  accessResults(trainingRun: TrainingRun) {
    this.router.navigate(['training', trainingRun.id, 'results'],{relativeTo: this.activeRoute})
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
          return this.trainingRunGetter.getTrainingRunsWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.length;

          return this.mapTrainingRunsToTraineesTrainingTableDataObjects(data);
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe(data => this.createDataSource(data));
  }

  private mapTrainingRunsToTraineesTrainingTableDataObjects(data: TrainingRun[]): TraineeAccessedTrainingsTableDataObject[] {
    const result: TraineeAccessedTrainingsTableDataObject[] = [];
    data.forEach(training => {
      const traineesTraining = new TraineeAccessedTrainingsTableDataObject();
      traineesTraining.trainingRun = training;
      this.trainingInstanceGetter.getTrainingInstanceById(training.trainingInstance.id)
        .pipe(map(instance => {
          traineesTraining.trainingInstance = instance;
          traineesTraining.totalLevels = traineesTraining.trainingInstance.trainingDefinition.levels.length
        }))
        .subscribe();

      result.push(traineesTraining);
    });
    return result;
  }

  private createDataSource(data: TraineeAccessedTrainingsTableDataObject[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: TraineeAccessedTrainingsTableDataObject, filter: string) =>
        data.trainingInstance.title.toLowerCase().indexOf(filter) !== -1
  }
}
