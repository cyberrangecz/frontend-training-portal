import { NgModule } from '@angular/core';
import { PoolOverviewComponentsModule } from 'kypo-sandbox-agenda/pool-overview';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { PoolOverviewRoutingModule } from './pool-overview-routing.module';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    PoolOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    PoolOverviewRoutingModule,
  ],
})
export class PoolOverviewModule {}
