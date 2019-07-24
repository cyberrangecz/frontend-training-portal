import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {SandboxInstance} from '../../../../../model/sandbox/sandbox-instance';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SandboxAllocationService} from '../../../../../services/organizer/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {SandboxInstanceTableAdapter} from '../../../../../model/table-adapters/sandbox-instance-table-adapter';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {TrainingInstanceSandboxAllocationState} from '../../../../../model/training/training-instance-sandbox-allocation-state';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {ActionConfirmationDialog} from '../../../../shared/delete-dialog/action-confirmation-dialog.component';
import {AllocationErrorDialogComponent} from "../allocation-error-dialog/allocation-error-dialog.component";
import {BaseComponent} from "../../../../base.component";
import {map, skipWhile, takeWhile} from 'rxjs/operators';


@Component({
  selector: 'app-sandbox-instances-subtable',
  templateUrl: './sandbox-instances-subtable.component.html',
  styleUrls: ['./sandbox-instances-subtable.component.css']
})
export class SandboxInstancesSubtableComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingInstance: TrainingInstance;
  @Input() allocation$: Observable<TrainingInstanceSandboxAllocationState>;
  @Output() allocationEvent: EventEmitter<Observable<TrainingInstanceSandboxAllocationState>> = new EventEmitter();

  displayedColumns: string[] = ['id', 'state', 'actions'];

  dataSource: MatTableDataSource<SandboxInstanceTableAdapter>;

  resultsLength = 0;
  isInErrorState = false;
  hasPoolId: boolean;
  canAllocate: boolean;
  isLoadingResults = false;
  isDisabled = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  filterByStatusFn = (data: SandboxInstanceTableAdapter, filter: string) =>
    data.sandboxInstance.state.toString().toLowerCase().indexOf(filter) !== -1;

  constructor(
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private allocationService: SandboxAllocationService,
    private sandboxInstanceFacade: SandboxInstanceFacade) {
    super();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    if (this.trainingInstance.hasTrainingRunConnectedWithSandbox(sandboxRow.sandboxInstance.id)) {
      this.askForConfirmation(sandboxRow);
    } else {
      this.sendRequestToDeleteSandbox(sandboxRow);
    }
  }

  showSandboxErrorMessage(sandboxRow: SandboxInstanceTableAdapter) {
    this.dialog.open(AllocationErrorDialogComponent, { data: sandboxRow.sandboxInstance });
  }

  private askForConfirmation(sandboxRow: SandboxInstanceTableAdapter) {
    const dialogRef = this.dialog.open(ActionConfirmationDialog, {
      data: {
        type: 'Sandbox Instance',
        action: 'delete',
        title: sandboxRow.sandboxInstance.id.toString(),
        additionalInfo: 'This sandbox instance is connected to training run.'
      }
    });

    dialogRef.afterClosed()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteSandbox(sandboxRow);
      }
    });
  }

  private sendRequestToDeleteSandbox(sandboxRow: SandboxInstanceTableAdapter) {
    const sandboxCount = this.getSandboxCount() - 1;
    this.isDisabled = true;
    const sandboxDeletion$ = this.allocationService.deleteSandbox(this.trainingInstance, sandboxRow.sandboxInstance, sandboxCount);
    sandboxDeletion$
      .pipe(
        takeWhile(() => this.isAlive),
        skipWhile(allocationState => !allocationState.wasUpdated)
        )
      .subscribe(
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
    sandboxAllocation$
      .pipe(
        takeWhile(() => this.isAlive),
        skipWhile(allocationState => !allocationState.wasUpdated)
      )
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
    this.sort.sortChange
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.paginator.pageIndex = 0);
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
    activeAllocation$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
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
    this.sandboxInstanceFacade.getSandboxesInPool(this.trainingInstance.poolId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
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
