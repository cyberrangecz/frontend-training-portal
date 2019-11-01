import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActiveTrainingRunService} from '../../../services/training-run/active-training-run.service';
import {BaseComponent} from '../../base.component';
import {map, takeWhile} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {Observable} from 'rxjs';
import {AccessedTrainingRun} from '../../../model/table-adapters/accessed-training-run';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {TrainingRunOverviewService} from '../../../services/shared/training-run-overview.service';
import {RouteFactory} from '../../../model/routes/route-factory';
import {environment} from '../../../../environments/environment';
import {TrainingRunOverviewTableCreator} from '../../../model/table-adapters/training-run-overview-table-creator';

@Component({
  selector: 'kypo2-trainee-overview',
  templateUrl: './training-run-overview.component.html',
  styleUrls: ['./training-run-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Main component of the trainee overview. Wrapper for child components (table and training access)
 */
export class TrainingRunOverviewComponent extends BaseComponent implements OnInit {

  trainingRuns$: Observable<Kypo2Table<AccessedTrainingRun>>;
  trainingRunsTotalLength$: Observable<number>;
  tableHasError$: Observable<boolean>;

  constructor(private activeTrainingRun: ActiveTrainingRunService,
              private trainingRunOverviewService: TrainingRunOverviewService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  access(accessToken: string) {
    this.activeTrainingRun.access(accessToken)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe(
        id => this.router.navigate([RouteFactory.toTrainingRunGame(id)]),
        err => this.errorHandler.display(err, 'Connecting to training run')
      );
  }

  onTableAction(event: TableActionEvent<AccessedTrainingRun>) {
    if (event.action.label.toLocaleLowerCase() === 'resume') {
      this.onResume(event.element.trainingRunId);
    } else if (event.action.label.toLocaleLowerCase() === 'access results') {
      this.onResults(event.element.trainingRunId);
    }
  }

  onResume(id: number) {
    this.trainingRunOverviewService.resume(id)
      .pipe(takeWhile( () => this.isAlive))
      .subscribe( trainingRunInfo => {
        this.activeTrainingRun.setUpFromTrainingRun(trainingRunInfo);
        this.router.navigate([RouteFactory.toTrainingRunGame(id)]);
        });
  }

  onResults(id: number) {
    this.router.navigate([RouteFactory.toTrainingRunResult(id)]);
  }

  loadAccessedTrainingRuns(event: LoadTableEvent) {
    this.trainingRunOverviewService.load(event.pagination)
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

    this.trainingRuns$ = this.trainingRunOverviewService.trainingRuns$
      .pipe(
        map(trainingRuns => TrainingRunOverviewTableCreator.create(trainingRuns))
      );
    this.tableHasError$ = this.trainingRunOverviewService.hasError$;
    this.trainingRunsTotalLength$ = this.trainingRunOverviewService.totalLength$;
  }
}
