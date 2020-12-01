import { NgModule } from '@angular/core';
import { PoolEditComponentsModule } from '@kypo/sandbox-agenda/pool-edit';
import { PoolEditRoutingModule } from './pool-edit-routing.module';

@NgModule({
  imports: [PoolEditComponentsModule, PoolEditRoutingModule],
})
export class PoolEditModule {}
