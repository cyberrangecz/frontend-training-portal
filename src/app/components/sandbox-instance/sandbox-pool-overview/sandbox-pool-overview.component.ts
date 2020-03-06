import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {Observable} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolService} from '../../../services/sandbox-instance/pool/pool.service';
import {BaseComponent} from '../../base.component';
import {PoolTable} from '../../../model/table/sandbox-instance/pool-table';
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
   event.action.result$
     .pipe(
       take(1)
     ).subscribe();
  }

  private initTable() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.pools$ = this.poolService.resource$
      .pipe(
        map(resource => new PoolTable(resource, this.poolService))
      );
    this.hasError$ = this.poolService.hasError$;
    this.onPoolsLoadEvent(initialLoadEvent);
  }

}
