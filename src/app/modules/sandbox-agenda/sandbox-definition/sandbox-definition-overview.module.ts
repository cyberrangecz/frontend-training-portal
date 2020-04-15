import {NgModule} from '@angular/core';
import {KypoSandboxApiModule} from 'kypo-sandbox-api';
import {SandboxDefinitionOverviewComponentsModule} from 'kypo-sandbox-agenda';
import {SandboxDefinitionOverviewRoutingModule} from './sandbox-definition-overview-routing.module';
import {SandboxAgendaSharedProvidersModule} from '../sandbox-agenda-shared-providers.module';
import {DynamicEnvironment} from '../../../../environments/dynamic-environment';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    SandboxDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    SandboxDefinitionOverviewRoutingModule
  ]
})
export class SandboxDefinitionOverviewModule {
}
