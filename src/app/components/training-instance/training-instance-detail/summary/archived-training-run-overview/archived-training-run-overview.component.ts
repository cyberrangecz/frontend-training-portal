import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {Kypo2Table} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../../services/shared/archived-training-run.service';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';

@Component({
  selector: 'kypo2-archived-training-run-overview',
  templateUrl: './archived-training-run-overview.component.html',
  styleUrls: ['./archived-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Component displaying real time archived (accessed by trainee and with sandbox removed) training runs for organizer.
 */
export class ArchivedTrainingRunOverviewComponent extends BaseComponent implements OnInit {
  @Input() trainingInstance: TrainingInstance;
  @Input() isPollingActive: boolean;

  archivedTrainingRuns$: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  archivedTrainingRunsTotalLength$: Observable<number>;
  archivedTrainingRunsTableHasError$: Observable<boolean>;
  selectedTrainingRuns: number[] = [];

  constructor(
    private archivedTrainingRunService: ArchivedTrainingRunService,
    private dialog: MatDialog) { super(); }

  ngOnInit() {
    this.startPolling();
  }

  onArchivedTrainingRunTableAction(event) {
    if (event.action.label.toLocaleLowerCase() === 'delete') {
      this.deleteTrainingRun(event.element.trainingRun.id);
    }
  }

  rowSelection(event: TrainingRunTableAdapter[]) {
    this.selectedTrainingRuns = [];
    event.forEach( selectedRun => {
      this.selectedTrainingRuns.push(selectedRun.trainingRun.id);
    });
  }

  deleteArchivedTrainingRuns() {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'archived training runs',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRuns();
      }
    });
  }

  deleteTrainingRun(id: number) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'archived training run',
        action: 'delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.type === 'confirm') {
        this.sendRequestToDeleteArchivedTrainingRun(id);
      }
    });
  }

  /**
   * Fetch data from server
   */
  protected fetchData(event?) {
    this.archivedTrainingRunService.getAll(this.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  onTableLoadEvent(event) {
    this.fetchData(event);
  }

  private sendRequestToDeleteArchivedTrainingRuns() {
    this.archivedTrainingRunService.deleteMultiple(this.selectedTrainingRuns)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  private sendRequestToDeleteArchivedTrainingRun(id: number) {
    this.archivedTrainingRunService.delete(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe();
  }

  private startPolling() {
    this.archivedTrainingRunService.startPolling(this.trainingInstance);
    this.archivedTrainingRuns$ = this.archivedTrainingRunService.archivedTrainingRuns$
      .pipe(
        takeWhile(_ => this.isPollingActive),
        map(trainingRuns => TrainingRunTableCreator.create(trainingRuns, 'archived'))
      );
    this.archivedTrainingRunsTableHasError$ = this.archivedTrainingRunService.hasError$;
    this.archivedTrainingRunsTotalLength$ = this.archivedTrainingRunService.totalLength$;
  }
}
