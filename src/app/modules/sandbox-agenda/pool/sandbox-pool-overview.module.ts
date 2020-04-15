import {NgModule} from '@angular/core';
import {SandboxAgendaSharedProvidersModule} from '../sandbox-agenda-shared-providers.module';
import {KypoSandboxApiModule} from 'kypo-sandbox-api';
import {SandboxPoolOverviewComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxPoolOverviewRoutingModule} from './sandbox-pool-overview-routing.module';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    SandboxPoolOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxPoolOverviewRoutingModule
  ]
})
export class SandboxPoolOverviewModule {

}
