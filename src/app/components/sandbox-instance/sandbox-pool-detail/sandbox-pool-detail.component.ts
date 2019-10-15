import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox-instance.service';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {Observable} from 'rxjs';
import {map, takeWhile, tap} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {BaseComponent} from '../../base.component';
import {SandboxInstanceTableCreator} from '../../../model/table-adapters/sandbox-instance-table-creator';
import {environment} from '../../../../environments/environment';
import {PoolRequestTableCreator} from '../../../model/table-adapters/pool-request-table-creator';
import {PoolCreationRequestsConcreteService} from '../../../services/sandbox-instance/pool-creation-requests-concrete.service';
import {PoolCleanupRequestsConcreteService} from '../../../services/sandbox-instance/pool-cleanup-requests-concrete.service';

@Component({
  selector: 'kypo2-sandbox-instance-overview',
  templateUrl: './sandbox-pool-detail.component.html',
  styleUrls: ['./sandbox-pool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolDetailComponent extends BaseComponent implements OnInit {

  pool: SandboxPool;

  instances$: Observable<Kypo2Table<SandboxInstance>>;
  instancesTotalLength$: Observable<number>;
  instancesTableHasError$: Observable<boolean>;

  creationRequests$: Observable<Kypo2Table<PoolRequest>>;
  creationRequestsTotalLength$: Observable<number>;
  creationRequestsTableHasError$: Observable<boolean>;

  cleanupRequests$: Observable<Kypo2Table<PoolRequest>>;
  cleanupRequestsTotalLength$: Observable<number>;
  cleanupRequestsTableHasError$: Observable<boolean>;

  constructor(private instanceService: SandboxInstanceService,
              private creationRequestService: PoolCreationRequestsConcreteService,
              private cleanupRequestService: PoolCleanupRequestsConcreteService,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initTables();
  }

  onInstanceLoadEvent(loadEvent: LoadTableEvent) {
    this.instanceService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  onCreationRequestsLoadEvent(loadEvent: LoadTableEvent) {
    this.creationRequestService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  onCleanupRequestsLoadEvent(loadEvent: LoadTableEvent) {
    this.cleanupRequestService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  onInstanceAction(event: TableActionEvent<SandboxInstance>) {
    if (event.action.label === SandboxInstanceTableCreator.DELETE_ACTION) {
      this.instanceService.delete(event.element)
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
  }

  onCreationAction(event: TableActionEvent<PoolRequest>) {
    let action$: Observable<any>;
    if (event.action.label === PoolRequestTableCreator.CANCEL_ACTION) {
      action$ = this.creationRequestService.cancel(this.pool.id, event.element);
    }
    if (event.action.label === PoolRequestTableCreator.RETRY_ACTION) {
      action$ = this.creationRequestService.retry(this.pool.id, event.element);
    }
    if (action$) {
      action$
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
  }

  onCleanupAction(event: TableActionEvent<PoolRequest>) {
    let action$: Observable<any>;
    if (event.action.label === PoolRequestTableCreator.CANCEL_ACTION) {
      action$ = this.cleanupRequestService.cancel(this.pool.id, event.element);
    }
    if (event.action.label === PoolRequestTableCreator.RETRY_ACTION) {
      action$ = this.cleanupRequestService.retry(this.pool.id, event.element);
    }
    if (action$) {
      action$
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
  }

  private initTables() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new RequestedPagination(0, environment.defaultPaginationSize, '', ''));
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => {
        this.pool = data.pool;
        this.onInstanceLoadEvent(initialLoadEvent);
        this.onCreationRequestsLoadEvent(initialLoadEvent);
        this.onCleanupRequestsLoadEvent(initialLoadEvent);
      }
    );

    this.instances$ = this.instanceService.instances$
      .pipe(
        map(instances => SandboxInstanceTableCreator.create(instances))
      );
    this.instancesTableHasError$ = this.instanceService.hasError$;
    this.instancesTotalLength$ = this.instanceService.totalLength$;

    this.creationRequests$ = this.creationRequestService.requests$
      .pipe(
        map(requests => PoolRequestTableCreator.create(requests, this.pool.id)));
    this.creationRequestsTableHasError$ = this.creationRequestService.hasError$;
    this.creationRequestsTotalLength$ = this.creationRequestService.totalLength$;

    this.cleanupRequests$ = this.cleanupRequestService.requests$
      .pipe(
        map(requests => PoolRequestTableCreator.create(requests, this.pool.id))
      );
    this.cleanupRequestsTableHasError$ = this.cleanupRequestService.hasError$;
    this.cleanupRequestsTotalLength$ = this.cleanupRequestService.totalLength$;
  }
}
