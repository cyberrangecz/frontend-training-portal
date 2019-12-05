import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EMPTY, interval, Observable} from 'rxjs';
import {map, switchMap, takeWhile} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {RequestedPagination} from '../../../../../model/DTOs/other/requested-pagination';
import {ActionConfirmationDialogComponent} from '../../../../shared/action-confirmation-dialog/action-confirmation-dialog.component';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {ActivatedRoute} from '@angular/router';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {ActiveTrainingRunService} from '../../../../../services/shared/active-training-run.service';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';

@Component({
  selector: 'kypo2-active-training-run-overview',
  templateUrl: './active-training-run-overview.component.html',
  styleUrls: ['./active-training-run-overview.component.scss'],

})
/**
 * Component displaying training runs and its state in real time. Allows organizer to easily archive training runs
 * by removing theirs sandboxes
 */
export class ActiveTrainingRunOverviewComponent extends BaseComponent implements OnInit {
  activeTrainingRuns$: Observable<Kypo2Table<TrainingRunTableAdapter>>;
  activeTrainingRunsTotalLength$: Observable<number>;
  activeTrainingRunsTableHasError$: Observable<boolean>;
  trainingInstance: TrainingInstance;

  now: number;
  fetchSandboxes = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private activeTrainingRunService: ActiveTrainingRunService,
    private dialog: MatDialog) {
    super();
    this.trainingInstance = this.activeTrainingRunService.trainingInstance;
  }

  ngOnInit() {
    this.startCurrentTimePeriodicalUpdate();
    this.initTables();
  }

  onActiveTrainingRunsTableSelection(event) {
    if (event.action.label.toLocaleLowerCase() === 'delete') {
      this.deleteSandboxOfTrainingRun(event.element);
    }
  }

  /**
   * Fetch data from server
   */
  protected fetchData(event?) {
    this.activeTrainingRunService.getAll(this.activeTrainingRunService.trainingInstance.id, event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
    this.fetchSandboxes = true;
  }

  onTableLoadEvent(event) {
    this.fetchData(event);
  }

  private initTables() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(_ => {
        this.fetchData(initialLoadEvent);
      }
    );
    this.activeTrainingRuns$ = this.activeTrainingRunService.activeTrainingRuns$
      .pipe(
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
        .subscribe()
    }
  }

  private askForDeleteSandboxConfirmation(row: TrainingRunTableAdapter) {
    const dialogRef = this.dialog.open(ActionConfirmationDialogComponent, {
      data: {
        type: 'sandbox instance',
        title: row.sandboxId,
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

  private startCurrentTimePeriodicalUpdate() {
    const period = 60000;
    this.now = Date.now();
    interval(period)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(_ =>
      this.now = Date.now()
    );
  }
}
