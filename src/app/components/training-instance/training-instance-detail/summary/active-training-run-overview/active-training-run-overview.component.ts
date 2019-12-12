import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EMPTY, Observable} from 'rxjs';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {ActiveTrainingRunService} from '../../../../../services/shared/active-training-run.service';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {TableActionEvent} from 'kypo2-table/lib/model/table-action-event';

@Component({
  selector: 'kypo2-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
/**
 * Component displaying training runs and its state in real time. Allows organizer to easily archive training runs
 * by removing theirs sandboxes
 */
export class ActiveTrainingRunOverviewComponent extends BaseComponent implements OnInit {

  @Input() trainingInstance: TrainingInstance;
  @Input() isPollingActive: boolean;

  activeTrainingRuns$: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  activeTrainingRunsTotalLength$: Observable<number>;
  activeTrainingRunsTableHasError$: Observable<boolean>;

  constructor(
    private activeTrainingRunService: ActiveTrainingRunService,
    private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.startPolling();
  }

  onActiveTrainingRunsTableSelection(event: TableActionEvent<TrainingRunTableAdapter>) {
    if (event.action.label.toLocaleLowerCase() === 'delete') {
      this.deleteSandboxOfTrainingRun(event.element);
    }
  }

  onTableLoadEvent(event: LoadTableEvent) {
    this.activeTrainingRunService.getAll(this.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private startPolling() {
    this.activeTrainingRunService.startPolling(this.trainingInstance);
    this.activeTrainingRuns$ = this.activeTrainingRunService.activeTrainingRuns$
      .pipe(
          takeWhile(_ => this.isPollingActive),
          map(trainingRuns => TrainingRunTableCreator.create(trainingRuns, 'active'))
      );
    this.activeTrainingRunsTableHasError$ = this.activeTrainingRunService.hasError$;
    this.activeTrainingRunsTotalLength$ = this.activeTrainingRunService.totalLength$;
  }

  /**
   * Reverts selected training run
   * @param row table object of training run
   */
  private deleteSandboxOfTrainingRun(row: TrainingRunTableAdapter) {
    if (row.trainingRun.hasPlayer() && row.trainingRun.isRunning()) {
      this.askForDeleteSandboxConfirmation(row);
    } else {
      this.activeTrainingRunService.deleteSandbox(this.trainingInstance.id, row.sandboxId)
        .pipe(
          takeWhile(_ => this.isAlive)
        )
        .subscribe();
    }
  }

  private askForDeleteSandboxConfirmation(row: TrainingRunTableAdapter) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'sandbox instance',
        title: row.sandboxId.toString(),
        action: 'delete'
      }
    });
    dialogRef.afterClosed()
      .pipe(
        takeWhile(() => this.isAlive),
        switchMap( result => (result && result.type === 'confirm')
          ? this.activeTrainingRunService.deleteSandbox(this.trainingInstance.id, row.sandboxId)
          : EMPTY
        )
      )
      .subscribe();
  }
}
