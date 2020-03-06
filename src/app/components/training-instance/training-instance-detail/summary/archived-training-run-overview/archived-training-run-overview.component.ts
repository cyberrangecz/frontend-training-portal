import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {defer, Observable, of} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../../services/training-run/archived/archived-training-run.service';
import {TrainingRunRowAdapter} from '../../../../../model/table/rows/training-run-row-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {KypoControlItem} from 'kypo-controls';
import {ArchivedTrainingRunTable} from '../../../../../model/table/training-run/archived-training-run-table';
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

  trainingRuns$: Observable<Kypo2Table<TrainingRunRowAdapter>>;
  hasError$: Observable<boolean>;
  selectedTrainingRunIds: number[] = [];
  controls: KypoControlItem[];

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
  onTableAction(event: TableActionEvent<TrainingRunRowAdapter>) {
    event.action.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Stores selected training runs emitted by table
   * @param event event containing selected training runs emitted by table
   */
  onRowSelection(event: TrainingRunRowAdapter[]) {
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

  private startPolling() {
    this.service.startPolling(this.trainingInstance);
    this.trainingRuns$ = this.service.archivedTrainingRuns$
      .pipe(
        takeWhile(_ => this.isPollingActive),
        map(resource => new ArchivedTrainingRunTable(resource, this.service))
      );
    this.hasError$ = this.service.hasError$;
  }

  private initControls() {
    const deleteLabel = this.selectedTrainingRunIds.length > 0
      ? `Delete (${this.selectedTrainingRunIds.length})`
      : 'Delete';
    this.controls = [
      new KypoControlItem(
        'deleteMultiple',
        deleteLabel,
        'warn',
        of(this.selectedTrainingRunIds.length <= 0),
        defer(() => this.service.deleteMultiple(this.selectedTrainingRunIds))
      )
    ];
  }
}
