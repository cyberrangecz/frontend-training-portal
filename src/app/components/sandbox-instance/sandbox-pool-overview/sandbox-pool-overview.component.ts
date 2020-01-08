import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolService} from '../../../services/sandbox-instance/pool/pool.service';
import {BaseComponent} from '../../base.component';
import {PoolTableCreator} from '../../../model/table/factory/pool-table-creator';
import {environment} from '../../../../environments/environment';

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
  totalLength$: Observable<number>;
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
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  /**
   * Resolves type of action and calls appropriate handler
   * @param event action event emitted from pool overview table
   */
  onPoolAction(event: TableActionEvent<SandboxPool>) {
    let action$;
    if (event.action.label === PoolTableCreator.DELETE_ACTION) {
      action$ = this.poolService.delete(event.element);
    }
    if (event.action.label === PoolTableCreator.ALLOCATE_ALL_ACTION) {
      action$ = this.poolService.allocate(event.element);
    }
    if (event.action.label === PoolTableCreator.ALLOCATE_ONE_ACTION) {
      action$ = this.poolService.allocate(event.element, 1);
    }
    if (event.action.label === PoolTableCreator.CLEAR_ACTION) {
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
    this.pools$ = this.poolService.pools$
      .pipe(
        map(paginatedResource => PoolTableCreator.create(paginatedResource))
      );
    this.totalLength$ = this.poolService.totalLength$;
    this.hasError$ = this.poolService.hasError$;
    this.onPoolsLoadEvent(initialLoadEvent);
  }

}
