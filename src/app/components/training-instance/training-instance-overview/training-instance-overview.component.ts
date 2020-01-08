import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouteFactory} from '../../../model/routes/route-factory';
import {BaseComponent} from '../../base.component';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../../../model/table/row/training-instance-row-adapter';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {environment} from '../../../../environments/environment';
import {TrainingInstanceTableCreator} from '../../../model/table/factory/training-instance-table-creator';
import {map, takeWhile} from 'rxjs/operators';

/**
 * Main component of organizer overview.
 */
@Component({
  selector: 'kypo2-training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceOverviewComponent extends BaseComponent implements OnInit, OnDestroy {

  readonly INITIAL_SORT_NAME = 'startTime';
  readonly INITIAL_SORT_DIR = 'desc';

  hasError$: Observable<boolean>;
  totalLength$: Observable<number>;
  instances$: Observable<Kypo2Table<TrainingInstanceRowAdapter>> ;

  constructor(private router: Router,
              private trainingInstanceService: TrainingInstanceOverviewService) {
    super();
  }

  ngOnInit() {
    this.initTable();
  }

  onCreate() {
    this.router.navigate([RouteFactory.toNewTrainingInstance()]);
  }

  onInstancesLoadEvent(loadEvent: LoadTableEvent) {
    this.trainingInstanceService.getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  onInstanceAction(event: TableActionEvent<any>) {
    if (event.action.label === TrainingInstanceTableCreator.EDIT_ACTION) {
      this.router.navigate([RouteFactory.toTrainingInstanceEdit(event.element.id)]);
      return;
    }

    let action$;
    if (event.action.label === TrainingInstanceTableCreator.ARCHIVE_ACTION) {
      action$ = this.trainingInstanceService.archive(event.element.id);
    }
    if (event.action.label === TrainingInstanceTableCreator.DELETE_ACTION) {
      action$ = this.trainingInstanceService.delete(event.element.id);
    }
    action$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  private initTable() {
    const initLoadEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, this.INITIAL_SORT_NAME, this.INITIAL_SORT_DIR)
    );
    this.instances$ = this.trainingInstanceService.trainingInstances$
      .pipe(
        map(paginatedResource => TrainingInstanceTableCreator.create(paginatedResource, this.trainingInstanceService))
      );
    this.totalLength$ = this.trainingInstanceService.totalLength$;
    this.hasError$ = this.trainingInstanceService.hasError$;
    this.onInstancesLoadEvent(initLoadEvent);
  }
}
