import { NgModule } from '@angular/core';
import { PoolOverviewComponentsModule } from '@muni-kypo-crp/sandbox-agenda/pool-overview';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { PoolOverviewRoutingModule } from './pool-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    PoolOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    PoolOverviewRoutingModule,
  ],
})
export class PoolOverviewModule {}
