import {NgModule} from '@angular/core';
import {SandboxInstanceTopologyComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxInstanceTopologyRoutingModule} from './sandbox-instance-topology-routing.module';
import {DynamicEnvironment} from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    SandboxInstanceTopologyComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule
  ],
})
export class SandboxInstanceTopologyModule {

}
