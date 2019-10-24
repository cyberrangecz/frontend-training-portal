import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {PoolRequestResolver} from '../../../services/resolvers/pool-request-resolver.service';
import {PoolRequestDetailMaterialModule} from './pool-request-detail-material.module';
import {PoolRequestDetailRoutingModule} from './pool-request-detail-routing.module';
import {PoolRequestDetailComponent} from './pool-request-detail.component';
import { RequestStageComponent } from './request-stage/request-stage.component';
import { RequestStageDetailComponent } from './request-stage/request-stage-detail/request-stage-detail.component';
import {PoolRequestStagesPollingService} from '../../../services/sandbox-instance/pool-request/pool-request-stages-polling.service';
import {PoolResolver} from '../../../services/resolvers/pool-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    PoolRequestDetailRoutingModule,
    PoolRequestDetailMaterialModule,
    SandboxInstanceFacadeModule,
  ],
  declarations: [
    PoolRequestDetailComponent,
    RequestStageComponent,
    RequestStageDetailComponent
  ],
  providers: [
    PoolResolver,
    PoolRequestResolver,
    PoolRequestStagesPollingService
  ]
})
export class PoolRequestDetailModule {
}
