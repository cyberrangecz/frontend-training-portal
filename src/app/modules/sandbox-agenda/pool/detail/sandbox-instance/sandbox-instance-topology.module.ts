import { NgModule } from '@angular/core';
import { SandboxInstanceTopologyComponentsModule } from '@muni-kypo-crp/sandbox-agenda/topology';
import { SandboxInstanceTopologyRoutingModule } from './sandbox-instance-topology-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    SandboxInstanceTopologyComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule,
  ],
})
export class SandboxInstanceTopologyModule {}
