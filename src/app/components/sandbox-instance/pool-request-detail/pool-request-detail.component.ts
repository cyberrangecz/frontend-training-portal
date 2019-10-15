import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {map, tap} from 'rxjs/operators';
import {RequestStage} from '../../../model/sandbox/pool/request/stage/request-stage';
import {BaseComponent} from '../../base.component';
import {PoolCleanupRequest} from '../../../model/sandbox/pool/request/pool-cleanup-request';

@Component({
  selector: 'kypo2-pool-requests',
  templateUrl: './pool-request-detail.component.html',
  styleUrls: ['./pool-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolRequestDetailComponent extends BaseComponent implements OnInit {

  request$: Observable<PoolRequest>;
  isCleanup: boolean;

  constructor(private activeRoute: ActivatedRoute) {
    super();
    this.request$ = this.activeRoute.data.pipe(
      map(data => data.poolRequest),
      tap(request => this.isCleanup = request instanceof PoolCleanupRequest)
    );
  }

  ngOnInit() {
  }

  trackByFn(index: number, item: RequestStage) {
    return item.id;
  }


  onForceCleanup(stage: RequestStage, index: number) {
    // TODO: Implement with service for state polling
  }
}
