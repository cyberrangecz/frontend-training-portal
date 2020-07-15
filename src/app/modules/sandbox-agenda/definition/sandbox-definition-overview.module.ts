import { NgModule } from '@angular/core';
import { SandboxDefinitionOverviewComponentsModule } from 'kypo-sandbox-agenda/sandbox-definition-overview';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxDefinitionOverviewRoutingModule } from './sandbox-definition-overview-routing.module';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    SandboxDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    SandboxDefinitionOverviewRoutingModule,
  ],
})
export class SandboxDefinitionOverviewModule {}
