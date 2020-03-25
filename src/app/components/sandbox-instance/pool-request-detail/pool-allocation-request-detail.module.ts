import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PoolRequestDetailModule} from './pool-request-detail.module';
import {RequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/request-stages-polling.service';
import {RequestAllocationStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/request-allocation-stages-polling.service';
import {StageDetailService} from '../../../services/sandbox-instance/pool-request/stage/detail/stage-detail.service';
import {AllocationStageDetailPollingService} from '../../../services/sandbox-instance/pool-request/stage/detail/allocation-stage-detail-polling.service';

@NgModule({
  imports: [
    CommonModule,
    PoolRequestDetailModule
  ],
  providers: [
    { provide: RequestStagesPollingService, useClass: RequestAllocationStagesPollingService},
    { provide: StageDetailService, useClass: AllocationStageDetailPollingService }
  ]
})
export class PoolAllocationRequestDetailModule {
}
