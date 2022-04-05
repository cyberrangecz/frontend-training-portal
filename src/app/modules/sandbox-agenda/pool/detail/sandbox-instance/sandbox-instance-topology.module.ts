import { NgModule } from '@angular/core';
import { SandboxInstanceTopologyRoutingModule } from './sandbox-instance-topology-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { SandboxTopologyComponentsModule } from '@muni-kypo-crp/sandbox-agenda/topology';

@NgModule({
  imports: [
    SandboxTopologyComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule,
  ],
})
export class SandboxInstanceTopologyModule {}
