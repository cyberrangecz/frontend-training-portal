import { NgModule } from '@angular/core';
import { SandboxDefinitionOverviewComponentsModule } from '@crczp/sandbox-agenda/sandbox-definition-overview';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxDefinitionOverviewRoutingModule } from './sandbox-definition-overview-routing.module';

@NgModule({
    imports: [
        SandboxAgendaSharedProvidersModule,
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        SandboxDefinitionOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxAgendaConfig),
        SandboxDefinitionOverviewRoutingModule,
    ],
})
export class SandboxDefinitionOverviewModule {}
