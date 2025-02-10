import { NgModule } from '@angular/core';
import { SandboxInstanceTopologyRoutingModule } from './sandbox-instance-topology-routing.module';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { SandboxTopologyComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/topology';

@NgModule({
  imports: [
    SandboxTopologyComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule,
  ],
})
export class SandboxInstanceTopologyModule {}
