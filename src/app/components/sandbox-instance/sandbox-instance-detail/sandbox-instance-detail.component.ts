import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Kypo2Table, LoadTableEvent} from 'kypo2-table';
import {SandboxInstanceResource} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance-resource/sandbox-instance-resource';
import {SandboxInstanceResourceService} from '../../../services/sandbox-instance/sandbox-instance-resource.service';

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
  resourcesHasError = false;

  constructor(private activeRoute: ActivatedRoute,
              private resourceService: SandboxInstanceResourceService) {
    super();
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => this.sandboxInstance = data.sandboxInstance);
  }

  ngOnInit() {
    this.calculateTopologySize();
    this.resources$ = this.resourceService.resources$;
    this.onResourceLoadEvent();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize();
  }

  onResourceLoadEvent(event: LoadTableEvent = null) {
    this.resourcesHasError = false;
    this.resourceService.getAll(this.sandboxInstance.poolId, this.sandboxInstance.id)
      .pipe(
        takeWhile(_ => this.isAlive),
      )
      .subscribe(
        _ => _,
        err => this.resourcesHasError = true);
  }

  private calculateTopologySize() {
    this.topologyWidth = window.innerWidth / 2.1;
    this.topologyHeight = (this.topologyWidth / 4) * 3;
  }
}
