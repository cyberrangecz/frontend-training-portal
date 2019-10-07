import { Component, OnInit } from '@angular/core';
import {Kypo2Table, LoadTableEvent, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {SandboxPool} from '../../../model/sandbox/sandbox-pool';
import {PoolService} from '../../../services/sandbox-instance/pool.service';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-sandbox-pool-overview',
  templateUrl: './sandbox-pool-overview.component.html',
  styleUrls: ['./sandbox-pool-overview.component.css']
})
export class SandboxPoolOverviewComponent extends BaseComponent implements OnInit {

  pools$: Observable<Kypo2Table<SandboxPool>>;
  poolsTotalLength: number;
  poolsTableHasError = false;

  private lastLoadEvent: LoadTableEvent;

  constructor(private poolService: PoolService) {
    super();
  }

  ngOnInit() {
    this.pools$ = this.poolService.pools$;
    this.lastLoadEvent = new LoadTableEvent(null, null);
    this.onPoolsLoadEvent();
  }

  onPoolsLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastLoadEvent = loadEvent;
      this.getPools(loadEvent.pagination);
    } else {
      this.getPools(this.lastLoadEvent.pagination);
    }
  }

  private getPools(pagination: RequestedPagination) {
    this.poolsTableHasError = false;
    this.poolService.get(pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedUsers => this.poolsTotalLength = paginatedUsers.pagination.totalElements,
        err => this.poolsTableHasError = true);
  }
}
