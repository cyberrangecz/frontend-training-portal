import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingRunTableAdapter} from "../../../../../model/table-adapters/training-run-table-adapter";
import {OnDestroy} from "@angular/core/src/metadata/lifecycle_hooks";
import {BaseTrainingRunsOverview} from "../base-training-runs-overview";
import {AlertService} from "../../../../../services/shared/alert.service";
import {ErrorHandlerService} from "../../../../../services/shared/error-handler.service";
import {ActiveTrainingInstanceService} from "../../../../../services/organizer/active-training-instance.service";
import {TrainingInstanceFacade} from "../../../../../services/facades/training-instance-facade.service";
import {environment} from "../../../../../../environments/environment";
import {merge, of} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {PaginatedTable} from "../../../../../model/table-adapters/paginated-table";

@Component({
  selector: 'archived-training-runs-overview',
  templateUrl: './archived-training-runs-overview.component.html',
  styleUrls: ['./archived-training-runs-overview.component.css']
})
export class ArchivedTrainingRunsOverviewComponent extends BaseTrainingRunsOverview implements OnInit, OnDestroy {

  displayedColumns: string[] = ['sandboxInstanceId', 'sandboxInstanceState', 'player', 'state'];
  archivedTrainingRunsDataSource: MatTableDataSource<TrainingRunTableAdapter>;

  resultsLength = 0;
  isLoadingResults = true;
  isInErrorState = false;

  @ViewChild(MatPaginator, { static: true }) activeTrainingRunsPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) activeTrainingRunSort: MatSort;

  constructor(
    activeTrainingInstanceService: ActiveTrainingInstanceService,
    private alertService: AlertService,
    private errorHandler: ErrorHandlerService,
    private trainingInstanceFacade: TrainingInstanceFacade) {
    super(activeTrainingInstanceService)
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * Creates table data source from training runs retrieved from a server.
   */
  protected initDataSource() {
    this.activeTrainingRunSort.sortChange.subscribe(() => this.activeTrainingRunsPaginator.pageIndex = 0);
    this.activeTrainingRunsPaginator.pageSize = environment.defaultPaginationSize;
    this.activeTrainingRunSort.active = 'id';
    this.activeTrainingRunSort.direction = 'desc';
    this.fetchData();
  }

  /**
   * Fetch data from server
   */
  protected fetchData() {
    let timeoutHandle = 0;
    merge(this.activeTrainingRunSort.sortChange, this.activeTrainingRunsPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          timeoutHandle = setTimeout(() => this.isLoadingResults = true, environment.defaultDelayToDisplayLoading);
          return this.trainingInstanceFacade.getTrainingRunsByTrainingInstanceIdWithPagination(this.trainingInstance.id,
            this.activeTrainingRunsPaginator.pageIndex, this.activeTrainingRunsPaginator.pageSize, this.activeTrainingRunSort.active, this.activeTrainingRunSort.direction)
        }),
        map(data => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = false;
          this.resultsLength = data.tablePagination.totalElements;
          return data;
        }),
        catchError(() => {
          window.clearTimeout(timeoutHandle);
          this.isLoadingResults = false;
          this.isInErrorState = true;
          return of([]);
        })
      ).subscribe(
        (data: PaginatedTable<TrainingRunTableAdapter[]>) =>
          this.archivedTrainingRunsDataSource = new MatTableDataSource(data.tableData)
    );
  }
}
