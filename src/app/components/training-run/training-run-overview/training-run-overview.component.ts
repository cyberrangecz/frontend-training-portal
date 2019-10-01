import { Component, OnInit } from '@angular/core';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {BaseComponent} from '../../base.component';
import {map, takeWhile, tap} from 'rxjs/operators';
import {TRAINING_RUN_GAME_PATH, TRAINING_RUN_RESULTS_PATH} from './paths';
import {TrainingRunFacade} from '../../../services/facades/training-run-facade.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {LoadTableEvent} from '../../../model/table-adapters/load-table-event';
import {Observable} from 'rxjs';
import {AccessedTrainingRunsTableRow} from '../../../model/table-adapters/accessed-training-runs-table-row';

@Component({
  selector: 'kypo2-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css']
})
/**
 * Main component of the trainee overview. Wrapper for child components (table and training access)
 */
export class TrainingRunOverviewComponent extends BaseComponent implements OnInit {

  accessedTrainingRuns$: Observable<AccessedTrainingRunsTableRow[]>;
  totalTrainingRuns$: Observable<number>;
  tableHasError = false;

  constructor(private activeTrainingRun: ActiveTrainingRunService,
              private trainingRunFacade: TrainingRunFacade,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.activeTrainingRun.clear();
  }

  access(accessToken: string) {
    this.activeTrainingRun.access(accessToken)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(
        id => this.router.navigate([id, TRAINING_RUN_GAME_PATH], { relativeTo: this.activeRoute }),
        err => this.errorHandler.display(err, 'Connecting to training run')
      );
  }

  onResume(id: number) {
    this.trainingRunFacade.resume(id)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(trainingRunInfo => {
        this.activeTrainingRun.setUpFromTrainingRun(trainingRunInfo);
        this.router.navigate([trainingRunInfo.trainingRunId, TRAINING_RUN_GAME_PATH], {relativeTo: this.activeRoute});
        },
        err => {
        this.errorHandler.display(err, 'Resuming training run');
      });
  }

  onResults(id: number) {
    this.router.navigate([id, TRAINING_RUN_RESULTS_PATH], {relativeTo: this.activeRoute});
  }

  loadAccessedTrainingRuns(event: LoadTableEvent) {
    const tableData$ = this.trainingRunFacade.getAccessedPaginated(event.pagination)
      .pipe(
        tap(_ => this.tableHasError = false,
          _ => this.tableHasError = true
        )
      );
    this.accessedTrainingRuns$ = tableData$.pipe(map(table => table.elements));
    this.totalTrainingRuns$ = tableData$.pipe(map(table => table.pagination.totalElements));
  }

}
