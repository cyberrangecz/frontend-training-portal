import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {PoolRequest} from '../../../model/sandbox/pool/request/pool-request';
import {map, takeWhile, tap} from 'rxjs/operators';
import {RequestStage} from '../../../model/sandbox/pool/request/stage/request-stage';
import {BaseComponent} from '../../base.component';
import {StageDetailService} from '../../../services/sandbox-instance/pool-request/stage/stage-detail.service';
import {StageDetail} from '../../../model/sandbox/pool/request/stage/stage-detail';
import {PoolRequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/pool-request-stages-polling.service';
import {StageDetailEventType} from '../../../model/enums/stage-detail-event-type';
import {StageDetailEvent} from '../../../model/events/stage-detail-event';

/**
 * Smart component for pool request detail page
 */
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

  private poolId: number;
  private requestId: number;
  private stageDetails: StageDetail[];

  constructor(private activeRoute: ActivatedRoute,
              private stageDetailService: StageDetailService,
              private requestStagesService: PoolRequestStagesPollingService) {
    super();
    this.initDataSource();
  }

  ngOnInit() {
  }

  /**
   * Helper method to improve performance of *ngFor directive
   * @param index index of pool request stage
   * @param item selected stage
   */
  trackByFn(index: number, item: RequestStage) {
    return item.id;
  }

  /**
   * Calls service to force cleanup stage
   * @param stage cleanup stage to force
   * @param index index of stage to force
   */
  onForceCleanup(stage: RequestStage, index: number) {
    this.requestStagesService.force(this.poolId, this.requestId, stage.id)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Reloads stages of pool request
   */
  reloadStages() {
    this.requestStagesService.getAll(this.poolId, this.requestId)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves type of stage detail event and calls appropriate handler
   * @param event stage detail event emitted from child component (subcribe or unsubsribe)
   */
  onStageDetailEvent(event: StageDetailEvent) {
    if (event.type === StageDetailEventType.SUBSCRIBE) {
      this.stageDetailService.subscribe(event.stage)
        .subscribe();
    } else {
      this.stageDetailService.unsubscribe(event.stage);
    }
  }

  /**
   * Gets details for specified stage
   * @param id id of stage which detail should be retrieved
   */
  getStageDetail(id: number): StageDetail {
    return this.stageDetails.find(stageDetail => stageDetail.stageId === id);
  }

  private initDataSource() {
    const data$ = this.activeRoute.data;
    this.request$ = data$.pipe(
      tap(data => {
        this.poolId = data.pool.id;
        this.requestId = data.poolRequest.id;
        this.isCleanup = data.poolRequestType === 'CLEANUP';
      }),
      map(data => data.poolRequest),
    );
    // We need to initialize polling with ids first
    data$
      .pipe(
        tap(data => this.requestStagesService.startPolling(data.pool.id, data.poolRequest.id, data.poolRequestType)),
        takeWhile(_ => this.isAlive)
      ).subscribe();

    this.stages$ = this.requestStagesService.resource$
      .pipe(
        map(paginatedStages => paginatedStages.elements)
      );

    this.hasError$ = this.requestStagesService.hasError$;
    this.stageDetailService.stageDetail$
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(stageDetails => this.stageDetails = stageDetails);

  }
}
