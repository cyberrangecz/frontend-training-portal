import { NgModule } from '@angular/core';
import { SandboxTopologyComponentsModule } from '@muni-kypo-crp/sandbox-agenda/topology';
import { SandboxDefinitionTopologyRoutingModule } from './sandbox-definition-topology-routing.module';
import { KypoDynamicEnvironment } from '../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    SandboxTopologyComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxDefinitionTopologyRoutingModule,
  ],
})
export class SandboxDefinitionTopologyModule {}
