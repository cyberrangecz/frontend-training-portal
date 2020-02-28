import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../../services/training-run/archived/archived-training-run.service';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
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

  trainingRuns: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  hasError$: Observable<boolean>;
  selectedTrainingRunIds: number[] = [];

  constructor(
    private archivedTrainingRunService: ArchivedTrainingRunService) { super(); }

  ngOnInit() {
    this.startPolling();
  }

  /**
   * Resolves actions and calls related action handler
   * @param event event emitted by table
   */
  onTableAction(event: TableActionEvent<TrainingRunTableAdapter>) {
    if (event.action.id === TrainingRunTableCreator.DELETE_ACTION_ID) {
      this.archivedTrainingRunService.delete(event.element.trainingRun.id)
        .pipe(
          takeWhile(_ => this.isAlive)
        ).subscribe();
    }
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
  }

  /**
   * Loads fresh data for table
   * @param event event to load new data emitted by table
   */
  onTableLoadEvent(event: LoadTableEvent) {
    this.archivedTrainingRunService.getAll(this.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  deleteSelectedTrainingRuns() {
    this.archivedTrainingRunService.deleteMultiple(this.selectedTrainingRunIds)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  private startPolling() {
    this.archivedTrainingRunService.startPolling(this.trainingInstance);
    this.trainingRuns = this.archivedTrainingRunService.archivedTrainingRuns$
      .pipe(
        takeWhile(_ => this.isPollingActive),
        map(paginatedRuns => TrainingRunTableCreator.create(paginatedRuns, 'archived'))
      );
    this.hasError$ = this.archivedTrainingRunService.hasError$;
  }
}
