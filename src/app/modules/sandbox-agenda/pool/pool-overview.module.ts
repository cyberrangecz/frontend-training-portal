import { NgModule } from '@angular/core';
import { PoolOverviewComponentsModule } from '@cyberrangecz-platform/sandbox-agenda/pool-overview';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { PoolOverviewRoutingModule } from './pool-overview-routing.module';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    PoolOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    PoolOverviewRoutingModule,
  ],
})
export class PoolOverviewModule {}
