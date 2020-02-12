import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PoolRequestResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-resolver.service';
import {PoolRequestDetailMaterialModule} from './pool-request-detail-material.module';
import {PoolRequestDetailRoutingModule} from './pool-request-detail-routing.module';
import {PoolRequestDetailComponent} from './pool-request-detail.component';
import {RequestStageComponent} from './request-stage/request-stage.component';
import {RequestStageDetailComponent} from './request-stage/request-stage-detail/request-stage-detail.component';
import {PoolRequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/stage/pool-request-stages-polling.service';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolRequestTypeResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-type-resolver.service';
import {PipesModule} from '../../../pipes/pipes.module';
import {StageDetailService} from '../../../services/sandbox-instance/pool-request/stage/stage-detail.service';
import {StageDetailPollingService} from '../../../services/sandbox-instance/pool-request/stage/stage-detail-polling.service';
import {SandboxInstanceApi} from '../../../services/api/sandbox-instance-api.service';

/**
 * Contains components and providers for pool request detail page
 */
@NgModule({
    imports: [
        CommonModule,
        PoolRequestDetailRoutingModule,
        PoolRequestDetailMaterialModule,
        PipesModule,
    ],
  declarations: [
    PoolRequestDetailComponent,
    RequestStageComponent,
    RequestStageDetailComponent
  ],
  providers: [
    SandboxInstanceApi,
    PoolResolver,
    PoolRequestResolver,
    PoolRequestTypeResolver,
    PoolRequestStagesPollingService,
    {provide: StageDetailService, useClass: StageDetailPollingService}
  ]
})
export class PoolRequestDetailModule {
}
