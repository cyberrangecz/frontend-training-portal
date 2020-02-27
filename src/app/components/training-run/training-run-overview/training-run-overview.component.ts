import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RunningTrainingRunService} from '../../../services/training-run/running/running-training-run.service';
import {BaseComponent} from '../../base.component';
import {map, takeWhile, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../../model/table/row/accessed-training-run';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {AccessedTrainingRunService} from '../../../services/training-run/accessed/accessed-training-run.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {environment} from '../../../../environments/environment';
import {TrainingRunOverviewTableCreator} from '../../../model/table/factory/training-run-overview-table-creator';

/**
 * Main smart component of the trainee overview.
 */
@Component({
  selector: 'kypo2-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingRunOverviewComponent extends BaseComponent implements OnInit {

  trainingRuns$: Observable<Kypo2Table<AccessedTrainingRun>>;
  hasError$: Observable<boolean>;

  constructor(private activeTrainingRun: RunningTrainingRunService,
              private trainingRunOverviewService: AccessedTrainingRunService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  /**
   * Calls service to access training run. If successful, navigate to the game
   * @param accessToken
   */
  access(accessToken: string) {
    this.activeTrainingRun.access(accessToken)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(
        id => this.router.navigate([RouteFactory.toTrainingRunGame(id)]),
        err => this.errorHandler.emit(err, 'Connecting to training run')
      );
  }

  /**
   * Resolves type of table action and handles it
   * @param event table action event
   */
  onTableAction(event: TableActionEvent<AccessedTrainingRun>) {
    if (event.action.id === TrainingRunOverviewTableCreator.RESUME_ACTION_ID) {
      this.onResume(event.element.trainingRunId);
    } else if (event.action.id === TrainingRunOverviewTableCreator.ACCESS_RESULT_ACTION_ID) {
      this.onResults(event.element.trainingRunId);
    }
  }

  /**
   * Calls service to resume in training run, if successful, navigates to the game
   * @param id id of training run to resume
   */
  onResume(id: number) {
    this.trainingRunOverviewService.resume(id)
      .pipe(takeWhile( () => this.isAlive))
      .subscribe( trainingRunInfo => {
        this.activeTrainingRun.setUpFromTrainingRun(trainingRunInfo);
        this.router.navigate([RouteFactory.toTrainingRunGame(id)]);
      });
  }

  /**
   * Navigates to training run results page
   * @param id id of the training run
   */
  onResults(id: number) {
    this.router.navigate([RouteFactory.toTrainingRunResult(id)]);
  }

  /**
   * Loads training run data for the table component
   * @param event load table event
   */
  loadAccessedTrainingRuns(event: LoadTableEvent) {
    this.trainingRunOverviewService.getAll(event.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => {
         this.loadAccessedTrainingRuns(initialLoadEvent);
    });
    this.activeTrainingRun.clear();

    this.trainingRuns$ = this.trainingRunOverviewService.resource$
      .pipe(
        map(paginatedRuns => TrainingRunOverviewTableCreator.create(paginatedRuns))
      );
    this.hasError$ = this.trainingRunOverviewService.hasError$;
  }
}
