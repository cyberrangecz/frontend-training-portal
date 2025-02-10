import { NgModule } from '@angular/core';
import { SandboxDefinitionOverviewComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/sandbox-definition-overview';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxDefinitionOverviewRoutingModule } from './sandbox-definition-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    SandboxDefinitionOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxDefinitionOverviewRoutingModule,
  ],
})
export class SandboxDefinitionOverviewModule {}
