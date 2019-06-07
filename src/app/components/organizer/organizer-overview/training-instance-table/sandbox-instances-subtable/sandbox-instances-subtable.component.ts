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
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SandboxAllocationService} from '../../../../../services/organizer/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {SandboxInstanceTableAdapter} from '../../../../../model/table-adapters/sandbox-instance-table-adapter';
import {environment} from '../../../../../../environments/environment';
import {Observable, Subscription} from 'rxjs';
import {TrainingInstanceSandboxAllocationState} from '../../../../../model/training/training-instance-sandbox-allocation-state';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {DeleteDialogComponent} from '../../../../shared/delete-dialog/delete-dialog.component';


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
  hasPoolId: boolean;
  canAllocate: boolean;
  isLoadingResults = false;
  isDisabled = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterByStatusFn = (data: SandboxInstanceTableAdapter, filter: string) =>
    data.sandboxInstance.state.toString().toLowerCase().indexOf(filter) !== -1;

  constructor(
    private dialog: MatDialog,
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
        this.canAllocate = false;
      }
      else {
        this.hasPoolId = true;
        this.canAllocate = this.trainingInstance.endTime.valueOf() > Date.now();
        this.initTableDataSource();
      }
    }
    if ('allocation$' in changes) {
      this.displayData();
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        type: 'Sandbox Instance',
        title: sandboxRow.sandboxInstance.id.toString()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteSandbox(sandboxRow);
      }
    });
  }

  private sendRequestToDeleteSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    const sandboxCount = this.getSandboxCount() - 1;
    this.isDisabled = true;
    const sandboxDeletion$ = this.allocationService.deleteSandbox(this.trainingInstance, sandboxRow.sandboxInstance, sandboxCount);
    sandboxRow.allocationSubscription = sandboxDeletion$.subscribe(
      allocationState =>  {
        this.isDisabled = false;
        this.displayData(allocationState);
      },
      err =>  {
        this.isDisabled = false;
        this.errorHandler.displayInAlert(err, 'Removing sandbox with id: ' +  sandboxRow.sandboxInstance.id);
      }
    );
    this.allocationEvent.emit(sandboxDeletion$);
  }

  allocateSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    this.isDisabled = true;
    const sandboxCount = this.getSandboxCount() + 1;
    const sandboxAllocation$ = this.allocationService.allocateSandbox(this.trainingInstance, sandboxCount);
    sandboxRow.allocationSubscription = sandboxAllocation$
      .subscribe(
        allocationState =>  {
          this.isDisabled = false;
          this.displayData(allocationState)
        },
        err =>  {
          this.isDisabled = false;
          this.errorHandler.displayInAlert(err, 'Allocating sandbox');
        }
      );
    this.allocationEvent.emit(sandboxAllocation$);
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
    const result: SandboxInstanceTableAdapter[] = [];

    for (let i = 0; i < this.trainingInstance.poolSize - sandboxes.length; i++) {
      const emptyRow = new SandboxInstanceTableAdapter();
      emptyRow.isCreated = false;
      emptyRow.isFailed = false;
      emptyRow.isInProgress = false;
      result.push(emptyRow);
    }

    sandboxes.forEach(sandbox => {
      const sandboxRow = new SandboxInstanceTableAdapter();
      sandboxRow.sandboxInstance = sandbox;
      sandboxRow.isCreated = sandbox.isCreated();
      sandboxRow.isFailed = sandbox.isFailed();
      sandboxRow.isInProgress = sandbox.isInProgress();
      result.push(sandboxRow);
    });
    return result;
  }

  private createDataSourceFromAllocationState(allocationState: TrainingInstanceSandboxAllocationState) {
    this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(allocationState.sandboxes));
    this.dataSource.filterPredicate = this.filterByStatusFn;
    this.isLoadingResults = false;
  }

  private getSandboxCount(): number {
    return this.dataSource.data.filter(row => !row.sandboxInstance || !row.sandboxInstance.isBeingDeleted()).length
  }
}
