import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {Observable} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolService} from '../../../services/sandbox-instance/pool/pool.service';
import {BaseComponent} from '../../base.component';
import {PoolTableCreator} from '../../../model/table/factory/pool-table-creator';
import {environment} from '../../../../environments/environment';
import {RequestedPagination} from '../../../model/DTOs/other/requested-pagination';

/**
 * Smart component of sandbox pool overview page
 */
@Component({
  selector: 'kypo2-sandbox-pool-overview',
  templateUrl: './sandbox-pool-overview.component.html',
  styleUrls: ['./sandbox-pool-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolOverviewComponent extends BaseComponent implements OnInit {

  pools$: Observable<Kypo2Table<SandboxPool>>;
  hasError$: Observable<boolean>;

  constructor(private poolService: PoolService) {
    super();
  }

  ngOnInit() {
    this.initTable();
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
    let action$;
    if (event.action.id === PoolTableCreator.DELETE_ACTION_ID) {
      action$ = this.poolService.delete(event.element);
    }
    if (event.action.id === PoolTableCreator.ALLOCATE_ALL_ACTION_ID) {
      action$ = this.poolService.allocate(event.element);
    }
    if (event.action.id === PoolTableCreator.ALLOCATE_ONE_ACTION_ID) {
      action$ = this.poolService.allocate(event.element, 1);
    }
    if (event.action.id === PoolTableCreator.CLEAR_ACTION_ID) {
      action$ = this.poolService.clear(event.element);
    }
    if (action$) {
      action$
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.pools$ = this.poolService.resource$
      .pipe(
        map(paginatedPools => PoolTableCreator.create(paginatedPools))
      );
    this.hasError$ = this.poolService.hasError$;
    this.onPoolsLoadEvent(initialLoadEvent);
  }

}
