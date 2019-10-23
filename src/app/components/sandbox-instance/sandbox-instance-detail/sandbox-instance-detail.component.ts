import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {map, takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceResourceService} from '../../../services/sandbox-instance/sandbox-instance-resource.service';
import {SandboxInstanceResourceTableCreator} from '../../../model/table-adapters/sandbox-instance-resource-table-creator';
import {Kypo2TopologyErrorService} from 'kypo2-topology-graph';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';

@Component({
  selector: 'kypo2-sandbox-instance-detail',
  templateUrl: './sandbox-instance-detail.component.html',
  styleUrls: ['./sandbox-instance-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxInstanceDetailComponent extends BaseComponent implements OnInit {

  sandboxInstance: SandboxInstance;
  topologyWidth: number;
  topologyHeight: number;
  resources$: Observable<Kypo2Table<SandboxInstanceResource>>;
  resourcesHasError$: Observable<boolean>;

  constructor(private activeRoute: ActivatedRoute,
              private resourceService: SandboxInstanceResourceService,
              private topologyErrorService: Kypo2TopologyErrorService,
              private errorHandlerService: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
    this.calculateTopologySize();
    this.initTable();
    this.subscribeToTopologyErrorHandler();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize();
  }

  onResourceLoadEvent(event: LoadTableEvent = null) {
    this.resourceService.getAll(this.sandboxInstance.id)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe();
  }

  private calculateTopologySize() {
    this.topologyWidth = window.innerWidth / 2.1;
    this.topologyHeight = (this.topologyWidth / 4) * 3;
  }

  private initTable() {
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => {
        this.sandboxInstance = data.sandboxInstance;
        this.onResourceLoadEvent();
      }
    );

    this.resources$ = this.resourceService.resources$.pipe(
      map(resources => SandboxInstanceResourceTableCreator.create(resources, this.sandboxInstance.poolId, this.sandboxInstance.id))
    );
    this.resourcesHasError$ = this.resourceService.hasError$;
  }
  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$.subscribe({
      next: event => this.errorHandlerService.display(event.err, event.action),
      error: err => this.errorHandlerService.display(err, 'There is a problem with topology error handler.'),
    });
  }
}
