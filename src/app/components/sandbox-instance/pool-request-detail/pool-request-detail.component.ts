import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {merge, Observable, Subject} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {map, mergeMap, switchMap, takeWhile, tap} from 'rxjs/operators';
import {RequestStage} from '../../../model/sandbox/pool/request/stage/request-stage';
import {BaseComponent} from '../../base.component';
import {PoolCleanupRequest} from '../../../model/sandbox/pool/request/pool-cleanup-request';
import {PoolRequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/pool-request-stages-polling.service';

@Component({
  selector: 'kypo2-pool-requests',
  templateUrl: './pool-request-detail.component.html',
  styleUrls: ['./pool-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolRequestDetailComponent extends BaseComponent implements OnInit {

  request$: Observable<PoolRequest>;
  stages$: Observable<RequestStage[]>;
  hasError$: Observable<boolean>;
  isCleanup: boolean;

  private stagesSubject$: Subject<RequestStage[]> = new Subject();
  private poolId: number;
  private requestId: number;

  constructor(private activeRoute: ActivatedRoute,
              private requestStagesService: PoolRequestStagesPollingService) {
    super();
    this.initDataSource();
  }

  ngOnInit() {
  }

  trackByFn(index: number, item: RequestStage) {
    return item.id;
  }

  onForceCleanup(stage: RequestStage, index: number) {
    this.requestStagesService.force(this.poolId, this.requestId, stage.id)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  private initDataSource() {
    const data$ = this.activeRoute.data;
    this.request$ = data$.pipe(
      tap(data => {
        this.poolId = data.pool.id;
        this.requestId = data.poolRequest.id;
      }),
      map(data => data.poolRequest),
      tap((request: PoolRequest) => {
        this.isCleanup = request instanceof PoolCleanupRequest;
      })
    );
    // We need to initialize polling with ids first
    data$
      .pipe(
        tap(data => this.requestStagesService.startPolling(data.pool.id, data.poolRequest.id)),
        switchMap(_ => this.requestStagesService.stages$),
        tap(stages => this.stagesSubject$.next(stages)),
        takeWhile(_ => this.isAlive)
      ).subscribe();

    this.stages$ = merge(this.request$.pipe(map(request => request.stages)), this.stagesSubject$.asObservable());
    this.hasError$ = this.requestStagesService.hasError$;
  }

  reloadStages() {
    this.requestStagesService.getAll(this.poolId, this.requestId)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }
}
