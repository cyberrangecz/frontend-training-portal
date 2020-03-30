import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {SandboxInstance} from 'kypo-sandbox-model';
import {ActivatedRoute} from '@angular/router';
import {Kypo2TopologyErrorService} from 'kypo2-topology-graph';
import {ErrorHandlerService} from '../../../services/shared/error-handler.service';
import {map, takeWhile} from 'rxjs/operators';
import {KypoBaseComponent} from 'kypo-common';
import {Observable} from 'rxjs';

/**
 * Smart component of sandbox instance topology page
 */
@Component({
  selector: 'kypo2-sandbox-instance-topology',
  templateUrl: './sandbox-instance-topology.component.html',
  styleUrls: ['./sandbox-instance-topology.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxInstanceTopologyComponent extends KypoBaseComponent implements OnInit {

  sandboxInstance$: Observable<SandboxInstance>;
  topologyWidth: number;
  topologyHeight: number;

  constructor(private activeRoute: ActivatedRoute,
              private topologyErrorService: Kypo2TopologyErrorService,
              private errorHandlerService: ErrorHandlerService) {
    super();
  }

  ngOnInit() {
    this.sandboxInstance$ = this.activeRoute.data
      .pipe(
        takeWhile(_ => this.isAlive),
        map(data => data.sandboxInstance)
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
        next: event => this.errorHandlerService.emit(event.err, event.action),
        error: err => this.errorHandlerService.emit(err, 'There is a problem with topology error handler.'),
      });
  }

}
