import { NgModule } from '@angular/core';
import { SandboxPoolDetailComponentsModule } from 'kypo-sandbox-agenda';
import { SandboxPoolDetailRoutingModule } from './sandbox-pool-detail-routing.module';

@NgModule({
  imports: [SandboxPoolDetailComponentsModule, SandboxPoolDetailRoutingModule],
})
export class SandboxPoolDetailModule {}
