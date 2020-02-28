import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {TableActionEvent} from 'kypo2-table/lib/model/table-action-event';
import {ActiveTrainingRunService} from '../../../../../services/training-run/active/active-training-run.service';
/**
 * Component displaying active training runs and its state in real time.
 */
@Component({
  selector: 'kypo2-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveTrainingRunOverviewComponent extends BaseComponent implements OnInit {

  @Input() trainingInstance: TrainingInstance;
  @Input() isPollingActive: boolean;

  activeTrainingRuns$: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  activeTrainingRunsTableHasError$: Observable<boolean>;

  constructor(
    private activeTrainingRunService: ActiveTrainingRunService) {
    super();
  }

  ngOnInit() {
    this.startPolling();
  }

  /**
   * Resolves type of action and calls handler
   * @param event action event emitted from table
   */
  onActiveTrainingRunAction(event: TableActionEvent<TrainingRunTableAdapter>) {
    if (event.action.id === TrainingRunTableCreator.DELETE_ACTION_ID) {
      this.activeTrainingRunService.deleteSandbox(event.element.trainingRun)
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    }
  }

  /**
   * Calls service to get new data for table
   * @param event reload data event emitted from table
   */
  onTableLoadEvent(event: LoadTableEvent) {
    this.activeTrainingRunService.getAll(this.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private startPolling() {
    this.activeTrainingRunService.startPolling(this.trainingInstance);
    this.activeTrainingRuns$ = this.activeTrainingRunService.resource$
      .pipe(
          takeWhile(_ => this.isPollingActive),
          map(paginatedRuns => TrainingRunTableCreator.create(paginatedRuns, 'active'))
      );
    this.activeTrainingRunsTableHasError$ = this.activeTrainingRunService.hasError$;
  }
}
