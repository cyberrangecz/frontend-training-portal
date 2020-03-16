import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2Table, LoadTableEvent, TableActionEvent} from 'kypo2-table';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox/sandbox-instance.service';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {Observable} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {KypoBaseComponent} from 'kypo-common';
import {SandboxInstanceTable} from '../../../model/table/sandbox-instance/sandbox-instance-table';
import {environment} from '../../../../environments/environment';
import {PoolCreationRequestsPollingService} from '../../../services/sandbox-instance/pool-request/creation/pool-creation-requests-polling.service';
import {PoolCleanupRequestsPollingService} from '../../../services/sandbox-instance/pool-request/cleanup/pool-cleanup-requests-polling.service';
import {KypoRequestedPagination} from 'kypo-common';
import {SandboxPoolDetailControls} from './sandbox-pool-detail-controls';
import {KypoControlItem} from 'kypo-controls';
import {CreationRequestTable} from '../../../model/table/sandbox-instance/pool-request/creation-request-table';

/**
 * Smart component of sandbox pool detail page
 */
@Component({
  selector: 'kypo2-sandbox-instance-overview',
  templateUrl: './sandbox-pool-detail.component.html',
  styleUrls: ['./sandbox-pool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolDetailComponent extends KypoBaseComponent implements OnInit {

  pool: SandboxPool;

  instances$: Observable<Kypo2Table<SandboxInstance>>;
  instancesTableHasError$: Observable<boolean>;

  creationRequests$: Observable<Kypo2Table<PoolRequest>>;
  creationRequestsTableHasError$: Observable<boolean>;

  cleanupRequests$: Observable<Kypo2Table<PoolRequest>>;
  cleanupRequestsTableHasError$: Observable<boolean>;

  controls: KypoControlItem[];

  constructor(private instanceService: SandboxInstanceService,
              private creationRequestService: PoolCreationRequestsPollingService,
              private cleanupRequestService: PoolCleanupRequestsPollingService,
              private activeRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.initTables();
    this.initControls();
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

  onControlsAction(control: KypoControlItem) {
    control.result$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Subscribes to result of a table action event
   * @param event action event emitted from table component
   */
  onTableAction(event: TableActionEvent<any>) {
    event.action.result$
      .pipe(
        take(1)
      ).subscribe();
  }

  private initTables() {
    const initialLoadEvent: LoadTableEvent = new LoadTableEvent(
      new KypoRequestedPagination(0, environment.defaultPaginationSize, '', ''));
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

    this.instances$ = this.instanceService.resource$
      .pipe(
        map(resource => new SandboxInstanceTable(resource, this.pool.id, this.instanceService))
      );
    this.instancesTableHasError$ = this.instanceService.hasError$;

    this.creationRequests$ = this.creationRequestService.resource$
      .pipe(
        map(resource => new CreationRequestTable(resource, this.pool.id)));
    this.creationRequestsTableHasError$ = this.creationRequestService.hasError$;

   // TODO: Add  cleanup when backend API supports cleanup requests
  }

  private initControls() {
    this.controls = SandboxPoolDetailControls.create(this.pool, this.instanceService);
  }
}
