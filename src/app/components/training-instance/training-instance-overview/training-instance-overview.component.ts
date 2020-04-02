import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {KypoBaseComponent} from 'kypo-common';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {TrainingInstanceRowAdapter} from '../../../model/table/rows/training-instance-row-adapter';
import {TrainingInstanceOverviewService} from '../../../services/training-instance/training-instance-overview.service';
import {KypoRequestedPagination} from 'kypo-common';
import {environment} from '../../../../environments/environment';
import {TrainingInstanceTable} from '../../../model/table/training-instance/training-instance-table';
import {map, take, takeWhile} from 'rxjs/operators';
import {TrainingInstanceOverviewControls} from './training-instance-overview-controls';
import {KypoControlItem} from 'kypo-controls';
import {SandboxNavigator} from 'kypo-sandbox-agenda';

/**
 * Main component of organizer overview.
 */
@Component({
  selector: 'kypo2-training-instance-overview',
  templateUrl: './training-instance-overview.component.html',
  styleUrls: ['./training-instance-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingInstanceOverviewComponent extends KypoBaseComponent implements OnInit, OnDestroy {

  readonly INITIAL_SORT_NAME = 'startTime';
  readonly INITIAL_SORT_DIR = 'desc';

  instances$: Observable<Kypo2Table<TrainingInstanceRowAdapter>>;
  hasError$: Observable<boolean>;

  controls: KypoControlItem[];

  constructor(private service: TrainingInstanceOverviewService,
              private navigator: SandboxNavigator) {
    super();
  }

  ngOnInit() {
    this.controls = TrainingInstanceOverviewControls.create(this.service);
    this.initTable();
  }

  onControlAction(control: KypoControlItem) {
    control.result$
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
    event.action.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  private initTable() {
    const initLoadEvent = new LoadTableEvent(
      new KypoRequestedPagination(0, environment.defaultPaginationSize, this.INITIAL_SORT_NAME, this.INITIAL_SORT_DIR)
    );
    this.instances$ = this.service.resource$
      .pipe(
        map(paginatedInstances => new TrainingInstanceTable(paginatedInstances, this.service, this.navigator))
      );
    this.hasError$ = this.service.hasError$;
    this.onInstancesLoadEvent(initLoadEvent);
  }
}
