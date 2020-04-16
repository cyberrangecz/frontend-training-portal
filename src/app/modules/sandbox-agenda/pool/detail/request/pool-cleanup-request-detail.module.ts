import { NgModule } from '@angular/core';
import { PoolCleanupRequestDetailComponentsModule } from 'kypo-sandbox-agenda';
import { PoolRequestDetailRoutingModule } from './pool-request-detail-routing.module';

@NgModule({
  imports: [PoolCleanupRequestDetailComponentsModule, PoolRequestDetailRoutingModule],
})
export class PoolCleanupRequestDetailModule {}
