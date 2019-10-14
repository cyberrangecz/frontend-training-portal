import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2Table, LoadTableEvent, RequestedPagination} from 'kypo2-table';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox-instance.service';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolRequestsService} from '../../../services/sandbox-instance/pool-requests.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-sandbox-instance-overview',
  templateUrl: './sandbox-pool-detail.component.html',
  styleUrls: ['./sandbox-pool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolDetailComponent extends BaseComponent implements OnInit {

  instances$: Observable<Kypo2Table<SandboxInstance>>;
  instancesTotalLength: number;
  instancesTableHasError = false;

  creationRequests$: Observable<Kypo2Table<PoolRequest>>;
  creationRequestsTotalLength: number;
  creationRequestsTableHasError = false;

  cleanupRequests$: Observable<Kypo2Table<PoolRequest>>;
  cleanupRequestsTotalLength: number;
  cleanupRequestsTableHasError = false;

  pool: SandboxPool;

  private lastInstancesLoadEvent: LoadTableEvent;
  private lastCreationRequestsLoadEvent: LoadTableEvent;
  private lastCleanupRequestsLoadEvent: LoadTableEvent;

  constructor(private instanceService: SandboxInstanceService,
              private requestsService: PoolRequestsService,
              private activeRoute: ActivatedRoute) {
    super();
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => this.pool = data.pool);
  }

  ngOnInit() {
    this.instances$ = this.instanceService.instances$;
    this.lastInstancesLoadEvent = new LoadTableEvent(null, null);
    this.onInstanceLoadEvent();

    this.creationRequests$ = this.requestsService.creationRequests$;
    this.lastCreationRequestsLoadEvent = new LoadTableEvent(null, null);
    this.onCreationRequestsLoadEvent();

    this.cleanupRequests$ = this.requestsService.cleanupRequests$;
    this.lastCleanupRequestsLoadEvent = new LoadTableEvent(null, null);
    this.onCleanupRequestsLoadEvent();
  }

  onInstanceLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastInstancesLoadEvent = loadEvent;
      this.getInstances(loadEvent.pagination);
    } else {
      this.getInstances(this.lastInstancesLoadEvent.pagination);
    }
  }

  onCreationRequestsLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastCreationRequestsLoadEvent = loadEvent;
      this.getCreationRequests(loadEvent.pagination);
    } else {
      this.getCreationRequests(this.lastCreationRequestsLoadEvent.pagination);
    }
  }

  onCleanupRequestsLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastCleanupRequestsLoadEvent = loadEvent;
      this.getCleanupRequests(loadEvent.pagination);
    } else {
      this.getCleanupRequests(this.lastCleanupRequestsLoadEvent.pagination);
    }
  }

  private getInstances(pagination: RequestedPagination) {
    this.instancesTableHasError = false;
    this.instanceService.getAll(this.pool.id, pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedInstances => this.instancesTotalLength = paginatedInstances.pagination.totalElements,
        err => this.instancesTableHasError = true);
  }


  private getCreationRequests(pagination: RequestedPagination) {
    this.creationRequestsTableHasError = false;
    this.requestsService.getCreationRequests(this.pool.id, pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedRequests => this.creationRequestsTotalLength = paginatedRequests.pagination.totalElements,
        err => this.creationRequestsTableHasError = true);
  }

  private getCleanupRequests(pagination: RequestedPagination) {
    this.cleanupRequestsTableHasError = false;
    this.requestsService.getCleanupRequests(this.pool.id, pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedRequests => this.cleanupRequestsTotalLength = paginatedRequests.pagination.totalElements,
        err => this.cleanupRequestsTableHasError = true);
  }
}
