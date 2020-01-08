import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Kypo2Table, LoadTableEvent, RequestedPagination, TableActionEvent} from 'kypo2-table';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {BaseComponent} from '../../base.component';
import {SandboxInstanceTableCreator} from '../../../model/table/factory/sandbox-instance-table-creator';
import {environment} from '../../../../environments/environment';
import {PoolRequestTableCreator} from '../../../model/table/factory/pool-request-table-creator';
import {PoolCreationRequestsPollingService} from '../../../services/sandbox-instance/pool-request/creation/pool-creation-requests-polling.service';
import {PoolCleanupRequestsPollingService} from '../../../services/sandbox-instance/pool-request/cleanup/pool-cleanup-requests-polling.service';
import {RouteFactory} from '../../../model/routes/route-factory';

/**
 * Smart component of sandbox pool detail page
 */
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
              private creationRequestService: PoolCreationRequestsPollingService,
              private cleanupRequestService: PoolCleanupRequestsPollingService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initTables();
  }

  /**
   * Gets new data for sandbox instance overview table
   * @param loadEvent load event emitted from sandbox instances table
   */
  onInstanceLoadEvent(loadEvent: LoadTableEvent) {
    this.instanceService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  /**
   * Gets new data for creation requests overview table
   * @param loadEvent load event emitted from creation requests table
   */
  onCreationRequestsLoadEvent(loadEvent: LoadTableEvent) {
    this.creationRequestService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  /**
   * Gets new data for cleanup requests overview table
   * @param loadEvent load event emitted from cleanup requests table
   */
  onCleanupRequestsLoadEvent(loadEvent: LoadTableEvent) {
    this.cleanupRequestService.getAll(this.pool.id, loadEvent.pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  /**
   * Resolves type of action emitted from sandbox instances table and calls appropriate handler
   * @param event action event emitted from sandbox instances table
   */
  onInstanceAction(event: TableActionEvent<SandboxInstance>) {
    if (event.action.label === SandboxInstanceTableCreator.DELETE_ACTION) {
      this.instanceService.delete(event.element)
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
    if (event.action.label === SandboxInstanceTableCreator.UNLOCK_ACTION) {
      this.instanceService.unlock(event.element)
        .pipe(takeWhile(_ => this.isAlive))
        .subscribe();
    }
    if (event.action.label === SandboxInstanceTableCreator.LOCK_ACTION) {
      this.instanceService.lock(event.element)
        .pipe(takeWhile( _ => this.isAlive))
        .subscribe();
    }
    if (event.action.label === SandboxInstanceTableCreator.TOPOLOGY_ACTION) {
      this.router.navigate([RouteFactory.toSandboxInstanceTopology(this.pool.id, event.element.id)]);
    }
  }

  /**
   * Resolves type of action emitted from creation requests table and calls appropriate handler
   * @param event action event emitted from creation requests table
   */
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

  /**
   * Resolves type of action emitted from cleanup requests table and calls appropriate handler
   * @param event action event emitted from cleanup requests table
   */
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

  /**
   * Calls service to allocate pool with sandbox instance
   */
  allocatePool() {
    this.instanceService.allocate(this.pool.id)
      .subscribe();
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
      // TODO: Add when backend API supports cleanup requests
      // this.onCleanupRequestsLoadEvent(initialLoadEvent);
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
        map(requests => PoolRequestTableCreator.create(requests, this.pool.id, 'CREATION')));
    this.creationRequestsTableHasError$ = this.creationRequestService.hasError$;
    this.creationRequestsTotalLength$ = this.creationRequestService.totalLength$;
   // TODO: Add when backend API supports cleanup requests
/*    this.cleanupRequests$ = this.cleanupRequestService.requests$
      .pipe(
        map(requests => PoolRequestTableCreator.create(requests, this.pool.id, 'CLEANUP'))
      );
    this.cleanupRequestsTableHasError$ = this.cleanupRequestService.hasError$;
    this.cleanupRequestsTotalLength$ = this.cleanupRequestService.totalLength$;*/
  }
}
