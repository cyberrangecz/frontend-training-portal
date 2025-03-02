import { NgModule } from '@angular/core';
import { SandboxTopologyComponentsModule } from '@crczp/sandbox-agenda/topology';
import { SandboxDefinitionTopologyRoutingModule } from './sandbox-definition-topology-routing.module';
import { PortalDynamicEnvironment } from '../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        SandboxTopologyComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxAgendaConfig),
        SandboxDefinitionTopologyRoutingModule,
    ],
})
export class SandboxDefinitionTopologyModule {}
