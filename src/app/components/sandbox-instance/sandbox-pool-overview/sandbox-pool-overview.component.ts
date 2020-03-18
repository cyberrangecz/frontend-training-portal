import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {defer, Observable, of} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolOverviewService} from '../../../services/sandbox-instance/pool/pool-overview.service';
import {KypoBaseComponent} from 'kypo-common';
import {PoolTable} from '../../../model/table/sandbox-instance/pool-table';
import {environment} from '../../../../environments/environment';
import {KypoRequestedPagination} from 'kypo-common';
import {KypoControlItem} from 'kypo-controls';

/**
 * Smart component of sandbox pool overview page
 */
@Component({
  selector: 'kypo2-sandbox-pool-overview',
  templateUrl: './sandbox-pool-overview.component.html',
  styleUrls: ['./sandbox-pool-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolOverviewComponent extends KypoBaseComponent implements OnInit {

  pools$: Observable<Kypo2Table<SandboxPool>>;
  hasError$: Observable<boolean>;

  controls: KypoControlItem[] =[];

  constructor(private poolService: PoolOverviewService) {
    super();
  }

  ngOnInit() {
    this.initTable();
    this.initControls();
  }

  /**
   * Gets new data for pool overview table
   * @param loadEvent load data event from table component
   */
  onPoolsLoadEvent(loadEvent: LoadTableEvent) {
    this.poolService.getAll(loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Resolves type of action and calls appropriate handler
   * @param event action event emitted from pool overview table
   */
  onPoolAction(event: TableActionEvent<SandboxPool>) {
   event.action.result$
     .pipe(
       take(1)
     ).subscribe();
  }

  onControls(controlItem: KypoControlItem) {
    controlItem.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new KypoRequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.pools$ = this.poolService.resource$
      .pipe(
        map(resource => new PoolTable(resource, this.poolService))
      );
    this.hasError$ = this.poolService.hasError$;
    this.onPoolsLoadEvent(initialLoadEvent);
  }

  private initControls() {
    this.controls = [
      new KypoControlItem(
        'create',
        'Create',
        'primary',
        of(false),
        defer(() => this.poolService.create())
      )
    ];
  }
}
