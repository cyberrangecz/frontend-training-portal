import { NgModule } from '@angular/core';
import { PoolOverviewComponentsModule } from '@muni-kypo-crp/sandbox-agenda/pool-overview';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { PoolOverviewRoutingModule } from './pool-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
import { KypoTrainingApiModule } from '@muni-kypo-crp/training-api';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    KypoTrainingApiModule.forRoot(KypoDynamicEnvironment.getConfig().trainingApiConfig),
    PoolOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    PoolOverviewRoutingModule,
  ],
})
export class PoolOverviewModule {}
