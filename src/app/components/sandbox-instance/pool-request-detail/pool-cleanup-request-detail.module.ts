import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PoolRequestDetailModule} from './pool-request-detail.module';
import {RequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/request-stages-polling.service';
import {StageDetailService} from '../../../services/sandbox-instance/pool-request/stage/detail/stage-detail.service';import {CleanupStageDetailPollingService} from '../../../services/sandbox-instance/pool-request/stage/detail/cleanup-stage-detail-polling.service';
import {RequestCleanupStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/request-cleanup-stages-polling.service';

@NgModule({
  imports: [
    CommonModule,
    PoolRequestDetailModule
  ],
  providers: [
    { provide: RequestStagesPollingService, useClass: RequestCleanupStagesPollingService},
    { provide: StageDetailService, useClass: CleanupStageDetailPollingService }
  ]
  })
export class PoolCleanupRequestDetailModule {

}
