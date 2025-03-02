import { NgModule } from '@angular/core';
import { SandboxInstanceTopologyRoutingModule } from './sandbox-instance-topology-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { SandboxTopologyComponentsModule } from '@crczp/sandbox-agenda/topology';

@NgModule({
    imports: [
        SandboxTopologyComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxAgendaConfig),
        SandboxInstanceTopologyRoutingModule,
    ],
})
export class SandboxInstanceTopologyModule {}
