import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Kypo2Table, LoadTableEvent, RequestedPagination} from 'kypo2-table';
import {Observable} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance';
import {SandboxPool} from '../../../model/sandbox/pool/sandbox-pool';
import {PoolRequestsService} from '../../../services/sandbox-instance/pool-requests.service';
import {SandboxInstanceService} from '../../../services/sandbox-instance/sandbox-instance.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-sandbox-instance-overview',
  templateUrl: './sandbox-pool-detail.component.html',
  styleUrls: ['./sandbox-pool-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPoolDetailComponent extends BaseComponent implements OnInit {

  instances$: Observable<Kypo2Table<SandboxInstance>>;
  instancesTotalLength: number;
  instancesTableHasError = false;

  creationRequests$: Observable<Kypo2Table<PoolRequest>>;
  creationRequestsTotalLength: number;
  creationRequestsTableHasError = false;

  deletionRequests$: Observable<Kypo2Table<PoolRequest>>;
  deletionRequestsTotalLength: number;
  deletionRequestsTableHasError = false;

  pool: SandboxPool;

  private lastInstancesLoadEvent: LoadTableEvent;
  private lastCreationRequestsLoadEvent: LoadTableEvent;
  private lastDeletionRequestsLoadEvent: LoadTableEvent;

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

    this.deletionRequests$ = this.requestsService.deletionRequests$;
    this.lastDeletionRequestsLoadEvent = new LoadTableEvent(null, null);
    this.onDeletionRequestsLoadEvent();
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

  onDeletionRequestsLoadEvent(loadEvent: LoadTableEvent = null) {
    if (loadEvent) {
      this.lastCreationRequestsLoadEvent = loadEvent;
      this.getDeletionRequests(loadEvent.pagination);
    } else {
      this.getDeletionRequests(this.lastCreationRequestsLoadEvent.pagination);
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

  private getDeletionRequests(pagination: RequestedPagination) {
    this.deletionRequestsTableHasError = false;
    this.requestsService.getDeletionRequests(this.pool.id, pagination)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        paginatedRequests => this.deletionRequestsTotalLength = paginatedRequests.pagination.totalElements,
        err => this.deletionRequestsTableHasError = true);
  }
}
