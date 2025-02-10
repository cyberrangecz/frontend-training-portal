import { NgModule } from '@angular/core';
import { SandboxTopologyComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/topology';
import { SandboxDefinitionTopologyRoutingModule } from './sandbox-definition-topology-routing.module';
import { DynamicEnvironment } from '../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    SandboxTopologyComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxDefinitionTopologyRoutingModule,
  ],
})
export class SandboxDefinitionTopologyModule {}
