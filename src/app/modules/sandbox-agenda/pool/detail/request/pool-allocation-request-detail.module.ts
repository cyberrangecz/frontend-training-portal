import { NgModule } from '@angular/core';
import { PoolAllocationRequestDetailComponentsModule } from 'kypo-sandbox-agenda';
import { PoolRequestDetailRoutingModule } from './pool-request-detail-routing.module';

@NgModule({
  imports: [PoolAllocationRequestDetailComponentsModule, PoolRequestDetailRoutingModule],
})
export class PoolAllocationRequestDetailModule {}
