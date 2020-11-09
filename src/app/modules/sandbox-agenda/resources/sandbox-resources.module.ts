import { NgModule } from '@angular/core';
import { ResourcesPageModule } from 'kypo-sandbox-agenda/sandbox-resources';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxResourcesOverviewRoutingModule } from './sandbox-resources-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    ResourcesPageModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    SandboxResourcesOverviewRoutingModule,
  ],
})
export class SandboxResourcesOverviewModule {}
