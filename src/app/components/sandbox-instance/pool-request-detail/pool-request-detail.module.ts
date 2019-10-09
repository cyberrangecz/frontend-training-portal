import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TableModule} from 'kypo2-table';
import {SandboxInstanceFacadeModule} from '../../../services/facades/modules/sandbox-instance-facade.module';
import {PoolRequestResolver} from '../../../services/resolvers/pool-request-resolver.service';
import {PoolRequestDetailMaterialModule} from './pool-request-detail-material.module';
import {PoolRequestDetailRoutingModule} from './pool-request-detail-routing.module';
import {PoolRequestDetailComponent} from './pool-request-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PoolRequestDetailRoutingModule,
    PoolRequestDetailMaterialModule,
    SandboxInstanceFacadeModule,
    Kypo2TableModule
  ],
  declarations: [PoolRequestDetailComponent],
  providers: [
    PoolRequestResolver
  ]
})
export class PoolRequestDetailModule {
}
