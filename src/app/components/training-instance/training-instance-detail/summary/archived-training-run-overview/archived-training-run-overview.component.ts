import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {defer, Observable, of} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../../services/training-run/archived/archived-training-run.service';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {ControlButton} from '../../../../../model/controls/control-button';
/**
 * Component for displaying archived (finished by trainee and with sandbox removed) training runs for organizer in real-time.
 */
@Component({
  selector: 'kypo2-archived-training-run-overview',
  templateUrl: './archived-training-run-overview.component.html',
  styleUrls: ['./archived-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchivedTrainingRunOverviewComponent extends BaseComponent implements OnInit {

  @Input() trainingInstance: TrainingInstance;
  @Input() isPollingActive: boolean;

  trainingRuns$: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  hasError$: Observable<boolean>;
  selectedTrainingRunIds: number[] = [];
  controls: ControlButton[];

  constructor(
    private service: ArchivedTrainingRunService) { super(); }

  ngOnInit() {
    this.startPolling();
    this.initControls();
  }

  /**
   * Resolves actions and calls related action handler
   * @param event event emitted by table
   */
  onTableAction(event: TableActionEvent<TrainingRunTableAdapter>) {
    if (event.action.id === TrainingRunTableCreator.DELETE_ACTION_ID) {
      this.service.delete(event.element.trainingRun.id)
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    }
  }

  onControlsAction(control: ControlButton) {
    control.action$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Stores selected training runs emitted by table
   * @param event event containing selected training runs emitted by table
   */
  onRowSelection(event: TrainingRunTableAdapter[]) {
    this.selectedTrainingRunIds = [];
    event.forEach( selectedRun => {
      this.selectedTrainingRunIds.push(selectedRun.trainingRun.id);
    });
    this.initControls();
  }

  /**
   * Loads fresh data for table
   * @param event event to load new data emitted by table
   */
  onTableLoadEvent(event: LoadTableEvent) {
    this.service.getAll(this.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  deleteSelectedTrainingRuns() {
    this.service.deleteMultiple(this.selectedTrainingRunIds)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  private startPolling() {
    this.service.startPolling(this.trainingInstance);
    this.trainingRuns$ = this.service.archivedTrainingRuns$
      .pipe(
        takeWhile(_ => this.isPollingActive),
        map(paginatedRuns => TrainingRunTableCreator.create(paginatedRuns, 'archived'))
      );
    this.hasError$ = this.service.hasError$;
  }

  private initControls() {
    const deleteLabel = this.selectedTrainingRunIds.length > 0
      ? `Delete (${this.selectedTrainingRunIds.length})`
      : 'Delete';
    this.controls = [
      new ControlButton(
        'deleteMultiple',
        deleteLabel,
        'warn',
        of(this.selectedTrainingRunIds.length <= 0),
        defer(() => this.service.deleteMultiple(this.selectedTrainingRunIds))
      )
    ];
  }
}
