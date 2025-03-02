import { NgModule } from '@angular/core';
import { PoolOverviewComponentsModule } from '@crczp/sandbox-agenda/pool-overview';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { PoolOverviewRoutingModule } from './pool-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        SandboxAgendaSharedProvidersModule,
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        PoolOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxAgendaConfig),
        PoolOverviewRoutingModule,
    ],
})
export class PoolOverviewModule {}
