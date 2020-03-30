import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Request} from 'kypo-sandbox-model';
import {map, takeWhile, tap} from 'rxjs/operators';
import {RequestStage} from 'kypo-sandbox-model';
import {KypoBaseComponent} from 'kypo-common';
import {StageDetailService} from '../../../services/sandbox-instance/pool-request/stage/detail/stage-detail.service';
import {StageDetailEventType} from '../../../model/enums/stage-detail-event-type';
import {StageDetailEvent} from '../../../model/events/stage-detail-event';
import {RequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/request-stages-polling.service';
import {StageDetail} from '../../../model/sandbox/stage-detail-adapter';

/**
 * Smart component for pool request detail page
 */
@Component({
  selector: 'kypo2-pool-requests',
  templateUrl: './pool-request-detail.component.html',
  styleUrls: ['./pool-request-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolRequestDetailComponent extends KypoBaseComponent implements OnInit {

  request$: Observable<Request>;
  stages$: Observable<RequestStage[]>;
  hasError$: Observable<boolean>;

  private request: Request;
  private stageDetails: StageDetail[];

  constructor(private activeRoute: ActivatedRoute,
              private stageDetailService: StageDetailService,
              private requestStagesService: RequestStagesPollingService) {
    super();
    this.init();
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
   * Reloads stages of pool request
   */
  reloadStages() {
    this.requestStagesService.getAll(this.request)
      .pipe(
        takeWhile(_ => this.isAlive)
      )
      .subscribe();
  }

  /**
   * Resolves type of stage detail event and calls appropriate handler
   * @param event stage detail event emitted from child component (subscribe or unsubscribe)
   */
  onStageDetailEvent(event: StageDetailEvent) {
    if (event.type === StageDetailEventType.OPEN) {
      this.stageDetailService.add(event.stage)
        .pipe(
          takeWhile(_ => this.isAlive)
        )
        .subscribe();
    } else {
      this.stageDetailService.remove(event.stage);
    }
  }


  onFetchAnsibleOutput(stageDetail: StageDetail) {
    this.stageDetailService.add(stageDetail.stage, stageDetail.requestedPagination)
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe();
  }

  /**
   * Gets details for specified stage
   * @param id id of stage which detail should be retrieved
   */
  getStageDetail(id: number): StageDetail {
    return this.stageDetails.find(stageDetail => stageDetail.stage.id === id);
  }

  private init() {
    const data$ = this.activeRoute.data;
    this.request$ = data$.pipe(
      tap(data => {
        this.request = data.poolRequest;
      }),
      map(data => data.poolRequest),
    );
    // We need to initialize polling with ids first
    data$
      .pipe(
        tap(data => this.requestStagesService.startPolling(data.poolRequest)),
        takeWhile(_ => this.isAlive)
      ).subscribe();

    this.stages$ = this.requestStagesService.resource$
      .pipe(
        map(paginatedStages => paginatedStages.elements)
      );

    this.hasError$ = this.requestStagesService.hasError$;
    this.stageDetailService.stageDetails$
      .pipe(
        takeWhile(_ => this.isAlive),
      ).subscribe(stageDetails => this.stageDetails = stageDetails);
  }

}
