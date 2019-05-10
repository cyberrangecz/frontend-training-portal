import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {SandboxInstance} from '../../../../../model/sandbox/sandbox-instance';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SandboxAllocationService} from '../../../../../services/organizer/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {SandboxInstanceTableAdapter} from '../../../../../model/table-adapters/sandbox-instance-table-adapter';
import {environment} from '../../../../../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {TrainingInstanceSandboxAllocationState} from '../../../../../model/training/training-instance-sandbox-allocation-state';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {SandboxAllocationState} from '../../../../../model/enums/sandbox-allocation-state';


@Component({
  selector: 'app-sandbox-instances-subtable',
  templateUrl: './sandbox-instances-subtable.component.html',
  styleUrls: ['./sandbox-instances-subtable.component.css']
})
export class SandboxInstancesSubtableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() trainingInstance: TrainingInstance;
  @Input() allocation$: Observable<TrainingInstanceSandboxAllocationState>;
  @Output() allocationEvent: EventEmitter<Observable<TrainingInstanceSandboxAllocationState>> = new EventEmitter();

  displayedColumns: string[] = ['id', 'state', 'actions'];

  dataSource: MatTableDataSource<SandboxInstanceTableAdapter>;

  globalAllocationSubscription: Subscription;

  resultsLength = 0;
  isInErrorState = false;
  hasPoolId = true;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterByStatusFn = (data: SandboxInstanceTableAdapter, filter: string) =>
    data.sandboxInstance.state.toString().toLowerCase().indexOf(filter) !== -1;

  constructor(
    private errorHandler: ErrorHandlerService,
    private allocationService: SandboxAllocationService,
    private sandboxInstanceFacade: SandboxInstanceFacade) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('trainingInstance' in changes) {
      if (this.trainingInstance && this.trainingInstance.poolId === null || this.trainingInstance.poolId === undefined) {
        this.hasPoolId = false;
      }
      else {
        this.initTableDataSource();
      }
    }
    if ('allocation$' in changes) {

    }
  }

  ngOnDestroy(): void {
    if (this.globalAllocationSubscription) {
      this.globalAllocationSubscription.unsubscribe();
    }
    if (this.dataSource && this.dataSource.data) {
      this.dataSource.data.forEach(sandboxRow => {
        if (sandboxRow.allocationSubscription) {
          sandboxRow.allocationSubscription.unsubscribe();
        }
      })
    }
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    const sandboxCount = this.dataSource.data.length;
    const sandboxDeletion$ = this.allocationService.deleteSandbox(this.trainingInstance, sandboxRow.sandboxInstance, sandboxCount);
    sandboxRow.allocationSubscription = sandboxDeletion$.subscribe(
        allocationState => this.displayData(allocationState),
        err => this.errorHandler.displayHttpError(err, 'Removing sandbox with id: ' +  sandboxRow.sandboxInstance.id)
        );
    this.allocationEvent.emit(sandboxDeletion$);
  }

  reallocateSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    const sandboxCount = this.dataSource.data.length;
    const sandboxReallocation$ = this.allocationService.reallocate(this.trainingInstance, sandboxRow.sandboxInstance, sandboxCount);
    sandboxRow.allocationSubscription = sandboxReallocation$
      .subscribe(
        allocationState => this.displayData(allocationState),
        err => this.errorHandler.displayHttpError(err, 'Reallocating sandbox with id: ' +  sandboxRow.sandboxInstance.id)
      );
    this.allocationEvent.emit(sandboxReallocation$);
  }

  private initTableDataSource() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = environment.defaultPaginationSize;
    this.sort.active = 'status';
    this.sort.direction = 'desc';
    this.displayData();
  }

  private displayData(allocationState: TrainingInstanceSandboxAllocationState = null) {
    this.isLoadingResults = true;
    if (allocationState) {
      this.createDataSourceFromAllocationState(allocationState);
    }
    else {
      if (this.allocation$) {
        this.createDataSourceFromAllocationObservable(this.allocation$);
      }
      else {
        this.fetchDataFromServer();
      }
    }
  }

  private createDataSourceFromAllocationObservable(activeAllocation$: Observable<TrainingInstanceSandboxAllocationState>) {
    activeAllocation$.subscribe(
      allocationState => {
        this.createDataSourceFromAllocationState(allocationState);
        this.isLoadingResults = false;
      },
      err => {
        this.isLoadingResults = false;
        this.isInErrorState = true;
      }
    )
  }

  private fetchDataFromServer() {
    this.sandboxInstanceFacade.getSandboxesInPool(this.trainingInstance.poolId).subscribe(
      sandboxes => {
        this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(sandboxes));
        this.dataSource.filterPredicate = this.filterByStatusFn;
        this.isLoadingResults = false;
      },
      err => {
        this.isLoadingResults = false;
        this.isInErrorState = true;
      }
    )
  }

  private mapSandboxesToTableData(sandboxes: SandboxInstance[]): SandboxInstanceTableAdapter[] {
    return sandboxes.map(sandbox => {
      const result = new SandboxInstanceTableAdapter();
      result.sandboxInstance = sandbox;
      result.isCreated = sandbox.isCreated();
      result.isFailed = sandbox.isFailed();
      result.isInProgress = sandbox.isInProgress();
      return result;
    })
  }

  private createDataSourceFromAllocationState(allocationState: TrainingInstanceSandboxAllocationState) {
    this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(allocationState.sandboxes));
    this.dataSource.filterPredicate = this.filterByStatusFn;
    this.isLoadingResults = false;
  }
}
