import { NgModule } from '@angular/core';
import { SandboxPoolOverviewComponentsModule } from 'kypo-sandbox-agenda';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxPoolOverviewRoutingModule } from './sandbox-pool-overview-routing.module';
@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    SandboxPoolOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxPoolOverviewRoutingModule,
  ],
})
export class SandboxPoolOverviewModule {}
