import {NgModule} from '@angular/core';
import {KypoSandboxApiModule} from 'kypo-sandbox-api';
import {environment} from '../../../../environments/environment';
import {SandboxDefinitionOverviewComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SharedProvidersModule} from '../shared-providers.module';

@NgModule({
  imports: [
    SharedProvidersModule,
    KypoSandboxApiModule.forRoot(environment.sandboxApiConfig),
    SandboxDefinitionOverviewComponentsModule.forRoot(environment.sandboxAgendaConfig),
    SandboxDefinitionOverviewRoutingModule
  ]
})
export class SandboxDefinitionOverviewModule {
}
