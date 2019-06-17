import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRunFacade} from "../../../../services/facades/training-run-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {AccessedTrainingRunsTableAdapter} from "../../../../model/table-adapters/accessed-training-runs-table-adapter";
import {TraineeAccessTrainingRunActionEnum} from "../../../../model/enums/trainee-access-training-run-actions.enum";
import {PaginatedTable} from "../../../../model/table-adapters/paginated-table";
import {ErrorHandlerService} from "../../../../services/shared/error-handler.service";
import {ActiveTrainingRunService} from "../../../../services/trainee/active-training-run.service";

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
  dataSource: MatTableDataSource<AccessedTrainingRunsTableAdapter>;

  actionType = TraineeAccessTrainingRunActionEnum;
  resultsLength = 0;
  isLoading = false;
  isInErrorState = false;
  now = Date.now();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private activeTrainingRunLevelsService: ActiveTrainingRunService,
    private errorHandler: ErrorHandlerService,
    private trainingRunFacade: TrainingRunFacade) { }

  ngOnInit() {
    this.initDataSource();
  }

  /**
   * Navigates to page with results of selected training run
   * @param {number} trainingRunId if of training run which results should be displayed
   */
  accessResults(trainingRunId: number) {
    this.router.navigate(['training/' + trainingRunId + '/results'],{relativeTo: this.activeRoute});

  }

  resume(trainingRunId: number) {
    this.isLoading = true;
    this.trainingRunFacade.resume(trainingRunId)
      .subscribe(trainingRunInfo => {
          this.activeTrainingRunLevelsService.setUpFromTrainingRun(trainingRunInfo);
          this.isLoading = false;
          this.router.navigate(['training/game'], {relativeTo: this.activeRoute});
      },
        err => {
        this.errorHandler.displayInAlert(err, "Resuming training run");
        this.isLoading = false;
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
    this.isLoading = true;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.fetchData();
  }

  private fetchData() {
    let timeoutHandle = 0;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          timeoutHandle = setTimeout(() => this.isLoading = true, environment.defaultDelayToDisplayLoading);
          return this.trainingRunFacade.getAccessedTrainingRunsWithPagination(this.paginator.pageIndex, this.paginator.pageSize,
            this.resolveSortParam(this.sort.active), this.sort.direction);
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoading = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError(() => {
          window.clearTimeout(timeoutHandle);
          this.isLoading = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe((data: PaginatedTable<AccessedTrainingRunsTableAdapter[]>) =>
      this.createDataSource(data.tableData));
  }

  private resolveSortParam(tableHeader: string): string {
    return tableHeader === 'date' ? 'startTime' : tableHeader;
  }

  private createDataSource(data: AccessedTrainingRunsTableAdapter[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate =
      (data: AccessedTrainingRunsTableAdapter, filter: string) =>
        data.trainingInstanceTitle.toLowerCase().indexOf(filter) !== -1
  }
}
