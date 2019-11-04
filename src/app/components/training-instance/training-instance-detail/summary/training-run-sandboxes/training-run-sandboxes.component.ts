import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {SandboxInstanceFacade} from '../../../../../services/facades/sandbox-instance-facade.service';
import {BaseComponent} from '../../../../base.component';
import {AlertTypeEnum} from '../../../../../model/enums/alert-type.enum';
import {TrainingRunTableRow} from '../../../../../model/table-adapters/training-run-table-row';
import {AlertService} from '../../../../../services/shared/alert.service';
import {ErrorHandlerService} from '../../../../../services/shared/error-handler.service';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {TrainingRunTableAdapter} from '../../../../../model/table-adapters/training-run-table-adapter';

@Component({
  selector: 'kypo2-training-run-sandboxes',
  templateUrl: './training-run-sandboxes.component.html',
  styleUrls: ['./training-run-sandboxes.component.scss']
})
export class TrainingRunSandboxesComponent extends BaseComponent implements OnInit, OnChanges {

  @Input() resultsLength = 0;
  @Input() trainingInstance: TrainingInstance;
  @Input() fetchInfo = false;
  @Input() now: number;
  @Input() deleteSandbox: TrainingRunTableAdapter;


  toAllocateInput: number;
  hasSandboxesInfoError = false;
  sandboxDeletionRunningCount: number;
  sandboxAllocationRunningCount: number;
  sandboxFailedCount: number;
  sandboxAvailableCount: number;
  sandboxCanBeAllocatedCount: number;

  constructor(private sandboxInstanceFacade: SandboxInstanceFacade,
              private alertService: AlertService,
              private errorHandler: ErrorHandlerService) { super(); }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('fetchInfo' in changes) {
      if (this.fetchInfo) {
        this.fetchInfoForSandboxes();
      }
    } else if ('deleteSandbox' in changes) {
      if (this.deleteSandbox) {
        this.sendRequestToDeleteSandbox(this.deleteSandbox);
      }
    }
  }

  private fetchInfoForSandboxes() {
    this.sandboxInstanceFacade.getSandboxes(this.trainingInstance.poolId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        resource => {
          this.hasSandboxesInfoError = false;
          this.sandboxFailedCount = resource.elements.filter(sandbox => sandbox.isFailed()).length;
          this.sandboxDeletionRunningCount = resource.elements.filter(sandbox => sandbox.isBeingDeleted()).length;
          this.sandboxAllocationRunningCount = resource.elements
            .filter(sandbox => sandbox.isInProgress())
            .length - this.sandboxDeletionRunningCount;
          this.sandboxAvailableCount = resource.elements.filter(sandbox => sandbox.isCreated()).length - this.resultsLength;
          this.sandboxCanBeAllocatedCount = Math.max(
            0,
            this.trainingInstance.poolSize - resource.elements.length - this.sandboxFailedCount
          );
          if (this.toAllocateInput === undefined) {
            this.toAllocateInput = this.sandboxCanBeAllocatedCount;
          }
        },
        err => {
          this.hasSandboxesInfoError = true;
        }
      );
  }

  private sendRequestToAllocateSandboxes(count: number) {
    this.sandboxInstanceFacade.allocateSandboxByTrainingInstance(this.trainingInstance.id, count)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        _ => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Allocation of sandboxes has begun');
          this.fetchInfoForSandboxes();
        },
        err => {
          this.errorHandler.display(err, 'Allocation of sandboxes');
        }
      );
  }

  private sendRequestToDeleteSandbox(row: TrainingRunTableRow) {
    row.deletionRequested = true;
    this.sandboxInstanceFacade.deleteByTrainingInstance(this.trainingInstance.id, row.trainingRun.sandboxInstanceId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        _ => {
          this.alertService.emitAlert(AlertTypeEnum.Success, 'Deletion of sandbox instance has started');
          this.fetchInfoForSandboxes();
        },
        err => {
          row.deletionRequested = false;
          this.errorHandler.display(err, 'Deletion sandbox instance');
        }
      );
  }

}
