import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {SandboxInstance} from '../../../../../model/sandbox/sandbox-instance';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {SandboxAllocationService} from '../../../../../services/training-instance/sandbox-allocation/sandbox-allocation.service';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {SandboxInstanceTableRow} from '../../../../../model/table-adapters/sandbox-instance-table-row';
import {Observable} from 'rxjs';
import {SandboxInstanceAllocationState} from '../../../../../model/training/sandbox-instance-allocation-state';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AllocationErrorReasonComponent} from '../allocation-error-reason-dialog/allocation-error-reason.component';
import {BaseComponent} from '../../../../base.component';
import {skipWhile, takeWhile} from 'rxjs/operators';


@Component({
  selector: 'kypo2-sandbox-instances-table',
  templateUrl: './sandbox-instances-table.component.html',
  styleUrls: ['./sandbox-instances-table.component.css']
})
/**
 * Table of sandbox instance coupled with some training instance. Either refreshes data periodically or displays
 * statical data (if no allocation is running).
 */
export class SandboxInstancesTableComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() trainingInstance: TrainingInstance;
  @Input() allocation$: Observable<SandboxInstanceAllocationState>;
  @Output() allocationEvent: EventEmitter<Observable<SandboxInstanceAllocationState>> = new EventEmitter();

  displayedColumns: string[] = ['id', 'state', 'actions'];

  dataSource: MatTableDataSource<SandboxInstanceTableRow>;

  resultsLength = 0;
  isInErrorState = false;
  hasPoolId: boolean;
  canAllocate: boolean;
  isLoadingResults = false;
  isDisabled = false;

  filterByStatusFn = (data: SandboxInstanceTableRow, filter: string) =>
    data.sandboxInstance.state.toString().toLowerCase().indexOf(filter) !== -1

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
      } else {
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

  deleteSandbox(sandboxRow: SandboxInstanceTableRow) {
    if (this.trainingInstance.hasTrainingRunConnectedWithSandbox(sandboxRow.sandboxInstance.id)) {
      this.askForConfirmation(sandboxRow);
    } else {
      this.sendRequestToDeleteSandbox(sandboxRow);
    }
  }

  showSandboxErrorMessage(sandboxRow: SandboxInstanceTableRow) {
    this.dialog.open(AllocationErrorReasonComponent, { data: sandboxRow.sandboxInstance });
  }

  private askForConfirmation(sandboxRow: SandboxInstanceTableRow) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
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

  private sendRequestToDeleteSandbox(sandboxRow: SandboxInstanceTableRow) {
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

  allocateSandbox(sandboxRow: SandboxInstanceTableRow) {
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
          this.displayData(allocationState);
        },
        err =>  {
          this.isDisabled = false;
          this.errorHandler.displayInAlert(err, 'Allocating sandbox');
        }
      );
    this.allocationEvent.emit(sandboxAllocation$);
  }

  private initTableDataSource() {
    this.displayData();
  }

  private displayData(allocationState: SandboxInstanceAllocationState = null) {
    this.isLoadingResults = true;
    if (allocationState) {
      this.createDataSourceFromAllocationState(allocationState);
    } else {
      if (this.allocation$) {
        this.createDataSourceFromAllocationObservable(this.allocation$);
      } else {
        this.fetchDataFromServer();
      }
    }
  }

  private createDataSourceFromAllocationObservable(activeAllocation$: Observable<SandboxInstanceAllocationState>) {
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
    );
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
    );
  }

  private mapSandboxesToTableData(sandboxes: SandboxInstance[]): SandboxInstanceTableRow[] {
    const result: SandboxInstanceTableRow[] = [];

    for (let i = 0; i < this.trainingInstance.poolSize - sandboxes.length; i++) {
      const emptyRow = new SandboxInstanceTableRow();
      result.push(emptyRow);
    }

    sandboxes.forEach(sandbox => {
      const sandboxRow = new SandboxInstanceTableRow();
      sandboxRow.sandboxInstance = sandbox;
      sandboxRow.isCreated = sandbox.isCreated();
      sandboxRow.isFailed = sandbox.isFailed();
      sandboxRow.isInProgress = sandbox.isInProgress();
      result.push(sandboxRow);
    });
    return result;
  }

  private createDataSourceFromAllocationState(allocationState: SandboxInstanceAllocationState) {
    this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(allocationState.sandboxes));
    this.dataSource.filterPredicate = this.filterByStatusFn;
    this.isLoadingResults = false;
  }

  private getSandboxCount(): number {
    return this.dataSource.data.filter(row => !row.sandboxInstance || !row.sandboxInstance.isBeingDeleted()).length;
  }
}
