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
import {SandboxInstance} from '../../../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {skipWhile, takeWhile} from 'rxjs/operators';
import {SandboxInstanceTableRow} from '../../../../../model/table-adapters/sandbox-instance-table-row';
import {SandboxInstanceAllocationState} from '../../../../../model/training/sandbox-instance-allocation-state';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {SandboxAllocationService} from '../../../../../services/training-instance/sandbox-allocation/sandbox-allocation.service';
import {BaseComponent} from '../../../../base.component';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {AllocationErrorReasonComponent} from '../allocation-error-reason-dialog/allocation-error-reason.component';


@Component({
  selector: 'kypo2-sandbox-instances-table',
  templateUrl: './sandbox-instances-table.component.html',
  styleUrls: ['./sandbox-instances-table.component.scss']
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
  isHardDelete = false;
  isInErrorState = false;
  hasPoolId: boolean;
  canAllocate: boolean;
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

  deleteSandbox(sandboxRow: SandboxInstanceTableRow, isHardDelete = false) {
    this.isHardDelete = isHardDelete;
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
    const sandboxDeletion$ = this.allocationService
      .deleteSandbox(this.trainingInstance, sandboxRow.sandboxInstance, sandboxCount, this.isHardDelete);
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
        this.errorHandler.display(err, 'Removing sandbox with id: ' +  sandboxRow.sandboxInstance.id);
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
          this.errorHandler.display(err, 'Allocating sandbox');
        }
      );
    this.allocationEvent.emit(sandboxAllocation$);
  }

  private initTableDataSource() {
    this.displayData();
  }

  private displayData(allocationState: SandboxInstanceAllocationState = null) {
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
      },
      err => {
        this.isInErrorState = true;
        this.errorHandler.display(err, 'Displaying sandbox data');
      }
    );
  }

  private fetchDataFromServer() {
    this.sandboxInstanceFacade.getSandboxes(this.trainingInstance.poolId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
      response => {
        this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(response.elements));
        this.dataSource.filterPredicate = this.filterByStatusFn;
      },
      err => {
        this.isInErrorState = true;
        this.errorHandler.display(err, 'Obtaining sandbox data');
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
      sandboxRow.isDeleteFailed = sandbox.isDeleteFailed();
      sandboxRow.isInProgress = sandbox.isInProgress();
      result.push(sandboxRow);
    });
    return result;
  }

  private createDataSourceFromAllocationState(allocationState: SandboxInstanceAllocationState) {
    this.dataSource = new MatTableDataSource(this.mapSandboxesToTableData(allocationState.sandboxes));
    this.dataSource.filterPredicate = this.filterByStatusFn;
  }

  private getSandboxCount(): number {
    return this.dataSource.data.filter(row => !row.sandboxInstance || !row.sandboxInstance.isBeingDeleted()).length;
  }
}
