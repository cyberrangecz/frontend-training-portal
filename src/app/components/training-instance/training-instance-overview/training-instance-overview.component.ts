import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../../../model/table/row/training-instance-row-adapter';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';
import {environment} from '../../../../environments/environment';
import {TrainingInstanceTableCreator} from '../../../model/table/factory/training-instance-table-creator';
import {map, takeWhile} from 'rxjs/operators';
import {ControlButton} from '../../../model/controls/control-button';
import {TrainingInstanceOverviewControls} from './training-instance-overview-controls';

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

  instances$: Observable<Kypo2Table<TrainingInstanceRowAdapter>>;
  hasError$: Observable<boolean>;

  controls: ControlButton[];

  constructor(private service: TrainingInstanceOverviewService) {
    super();
  }

  ngOnInit() {
    this.initTable();
    this.initControls();
  }

  onControlAction(control: ControlButton) {
    control.action$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  onInstancesLoadEvent(loadEvent: LoadTableEvent) {
    this.service.getAll(loadEvent.pagination, loadEvent.filter)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  onInstanceAction(event: TableActionEvent<any>) {
    let action$;
    if (event.action.id === TrainingInstanceTableCreator.EDIT_ACTION_ID) {
      action$ = this.service.edit(event.element.id);
    }

    if (event.action.id === TrainingInstanceTableCreator.ARCHIVE_ACTION_ID) {
      action$ = this.service.archive(event.element.id);
    }
    if (event.action.id === TrainingInstanceTableCreator.DELETE_ACTION_ID) {
      action$ = this.service.delete(event.element.id);
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
    this.instances$ = this.service.resource$
      .pipe(
        map(paginatedInstances => TrainingInstanceTableCreator.create(paginatedInstances, this.service))
      );
    this.hasError$ = this.service.hasError$;
    this.onInstancesLoadEvent(initLoadEvent);
  }

  private initControls() {
    this.controls = TrainingInstanceOverviewControls.create(this.service);
  }
}
