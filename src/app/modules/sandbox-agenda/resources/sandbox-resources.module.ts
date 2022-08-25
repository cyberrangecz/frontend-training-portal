import { NgModule } from '@angular/core';
import { ResourcesPageModule } from '@muni-kypo-crp/sandbox-agenda/sandbox-resources';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { SandboxResourcesOverviewRoutingModule } from './sandbox-resources-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    ResourcesPageModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxResourcesOverviewRoutingModule,
  ],
})
export class SandboxResourcesOverviewModule {}
