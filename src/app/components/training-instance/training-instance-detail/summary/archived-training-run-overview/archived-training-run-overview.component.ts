import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {ArchivedTrainingRunService} from '../../../../../services/training-run/archived/archived-training-run.service';
import {TrainingRunTableCreator} from '../../../../../model/table/factory/training-run-table-creator';
import {TrainingRunTableAdapter} from '../../../../../model/table/row/training-run-table-adapter';
import {BaseComponent} from '../../../../base.component';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {
  CsirtMuConfirmationDialogComponent,
  CsirtMuConfirmationDialogConfig,
  CsirtMuDialogResultEnum
} from 'csirt-mu-layout';

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

  /**
   * Resolves actions and calls related action handler
   * @param event event emitted by table
   */
  onArchivedTrainingRunTableAction(event: TableActionEvent<TrainingRunTableAdapter>) {
    if (event.action.id === TrainingRunTableCreator.DELETE_ACTION_ID) {
      this.deleteTrainingRun(event.element.trainingRun.id);
    }
  }

  /**
   * Stores selected training runs emitted by table
   * @param event event containing selected training runs emitted by table
   */
  onRowSelection(event: TrainingRunTableAdapter[]) {
    this.selectedTrainingRuns = [];
    event.forEach( selectedRun => {
      this.selectedTrainingRuns.push(selectedRun.trainingRun.id);
    });
  }

  /**
   * Displays confirmation dialog and if confirmed, calls service to delete archived training runs
   */
  deleteSelectedTrainingRuns() {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Training Runs',
        'Do you want to delete selected training run?',
        'Cancel',
        'Delete'
      )
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === CsirtMuDialogResultEnum.CONFIRMED) {
        this.sendRequestToDeleteArchivedTrainingRuns();
      }
    });
  }

  /**
   * Displays confirmation dialog and if confirmed, calls service to delete selected archived training run
   * @param id id of training run to delete
   */
  deleteTrainingRun(id: number) {
    const dialogRef = this.dialog.open(CsirtMuConfirmationDialogComponent, {
      data: new CsirtMuConfirmationDialogConfig(
        'Delete Training Run',
        `Do you want to delete training run with ID "${id}"?`,
        'Cancel',
        'Delete'
      )
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === CsirtMuDialogResultEnum.CONFIRMED) {
        this.sendRequestToDeleteArchivedTrainingRun(id);
      }
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
