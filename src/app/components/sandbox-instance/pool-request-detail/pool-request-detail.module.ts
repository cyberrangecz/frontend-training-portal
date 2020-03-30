import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PoolRequestResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-resolver.service';
import {PoolRequestDetailMaterialModule} from './pool-request-detail-material.module';
import {PoolRequestDetailRoutingModule} from './pool-request-detail-routing.module';
import {PoolRequestDetailComponent} from './pool-request-detail.component';
import {RequestStageComponent} from './request-stage/request-stage.component';
import {RequestStageDetailComponent} from './request-stage/request-stage-detail/request-stage-detail.component';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolRequestTypeResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-type-resolver.service';
import {KypoPipesModule} from 'kypo-common';
import {AnsibleAllocationStageDetailComponent} from './request-stage/request-stage-detail/ansible-allocation-stage-detail/ansible-allocation-stage-detail.component';
import {OpenstackAllocationStageDetailComponent} from './request-stage/request-stage-detail/openstack-allocation-stage-detail/openstack-allocation-stage-detail.component';
import {CleanupStageDetailComponent} from './request-stage/request-stage-detail/cleanup-stage-detail/cleanup-stage-detail.component';
import {RequestStageCommonComponent} from './request-stage/stage-header/request-stage-common.component';

/**
 * Contains components and providers for pool request detail page
 */
@NgModule({
  imports: [
    CommonModule,
    PoolRequestDetailRoutingModule,
    PoolRequestDetailMaterialModule,
    KypoPipesModule
  ],
  declarations: [
    PoolRequestDetailComponent,
    RequestStageComponent,
    RequestStageCommonComponent,
    RequestStageDetailComponent,
    AnsibleAllocationStageDetailComponent,
    OpenstackAllocationStageDetailComponent,
    CleanupStageDetailComponent
  ],
  providers: [
    PoolResolver,
    PoolRequestResolver,
    PoolRequestTypeResolver,
  ],
})
export class PoolRequestDetailModule {
}
