import {NgModule} from '@angular/core';
import {SandboxInstanceTopologyComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxInstanceTopologyRoutingModule} from './sandbox-instance-topology-routing.module';
import {environment} from '../../../../../../environments/environment';

@NgModule({
  imports: [
    SandboxInstanceTopologyComponentsModule.forRoot(environment.sandboxAgendaConfig),
    SandboxInstanceTopologyRoutingModule
  ]
})
export class SandboxInstanceTopologyModule {

}
