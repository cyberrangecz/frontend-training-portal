import { NgModule } from '@angular/core';
import { PoolDetailComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/pool-detail';
import { PoolDetailRoutingModule } from './pool-detail-routing.module';

@NgModule({
  imports: [PoolDetailComponentsModule, PoolDetailRoutingModule],
})
export class PoolDetailModule {}
