import { NgModule } from '@angular/core';
import { ResourcesPageModule } from 'kypo-sandbox-agenda/sandbox-resources';
import { KypoSandboxApiModule } from 'kypo-sandbox-api';
import { DynamicEnvironment } from './../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from './../sandbox-agenda-shared-providers.module';
import { SandboxResourcesOverviewRoutingModule } from './sandbox-resources-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    ResourcesPageModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    SandboxResourcesOverviewRoutingModule,
  ],
})
export class SandboxResourcesOverviewModule {}
