import { NgModule } from '@angular/core';
import { SandboxInstanceTopologyComponentsModule } from 'kypo-sandbox-agenda';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { SandboxInstanceTopologyRoutingModule } from './sandbox-instance-topology-routing.module';

@NgModule({
  imports: [
    SandboxInstanceTopologyComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule,
  ],
})
export class SandboxInstanceTopologyModule {}
