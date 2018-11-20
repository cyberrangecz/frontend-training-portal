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
    private activeUserService: ActiveUserService,
    private trainingRunGetter: TrainingRunGetterService) { }

  ngOnInit() {
    this.initDataSource();
  }

  /**
   * Allocates resources for new sandbox and starts new training run on a first level
   * @param {number} trainingInstanceId id of training instance which should be started
   */
  tryAgain(trainingInstanceId: number) {
    // TODO: Integrate with appropriate REST API call once its resolved
    const trainingRunId = 1;
    const firstLevel = 1;
    this.router.navigate(['training', trainingRunId, 'level', firstLevel], {relativeTo: this.activeRoute});
  }

  /**
   * Navigates to page with results of selected training run
   * @param {number} trainingRunId if of training run which results should be displayed
   */
  accessResults(trainingRunId: number) {
    this.router.navigate(['training', trainingRunId, 'results'],{relativeTo: this.activeRoute})
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
          return this.trainingRunGetter.getAccessedTrainingRunsWithPaginatios(this.paginator.pageIndex, this.paginator.pageSize,
            this.resolveSortParam(this.sort.active), this.sort.direction);
        }),
        map(data => {
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

  private resolveSortParam(tableHeader: string): string {
    return tableHeader === 'date' ? 'startTime' : tableHeader;
  }

  private createDataSource(data: TraineeAccessedTrainingsTableDataModel[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: TraineeAccessedTrainingsTableDataModel, filter: string) =>
        data.trainingInstanceTitle.toLowerCase().indexOf(filter) !== -1
  }
}
