import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {SandboxInstance} from '../../../model/sandbox/pool/sandbox-instance/sandbox-instance';
import {ActivatedRoute} from '@angular/router';
import {Kypo2TopologyErrorService} from 'kypo2-topology-graph';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {takeWhile} from 'rxjs/operators';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-sandbox-instance-topology',
  templateUrl: './sandbox-instance-topology.component.html',
  styleUrls: ['./sandbox-instance-topology.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxInstanceTopologyComponent extends BaseComponent implements OnInit {

  sandboxInstance: SandboxInstance;
  topologyWidth: number;
  topologyHeight: number;

  constructor(private activeRoute: ActivatedRoute,
              private topologyErrorService: Kypo2TopologyErrorService,
              private errorHandlerService: ErrorHandlerService) {
    super();
  }
  ngOnInit() {
    this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(data => {
        this.sandboxInstance = data.sandboxInstance;
      }
    );
    this.calculateTopologySize();
    this.subscribeToTopologyErrorHandler();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateTopologySize();
  }

  private calculateTopologySize() {
    this.topologyWidth = window.innerWidth - 300;
    this.topologyHeight = window.innerHeight - 260;
  }

  private subscribeToTopologyErrorHandler() {
    this.topologyErrorService.error$
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe({
        next: event => this.errorHandlerService.display(event.err, event.action),
        error: err => this.errorHandlerService.display(err, 'There is a problem with topology error handler.'),
      });
  }

}
