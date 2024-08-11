import { NgModule } from '@angular/core';
import { KypoSandboxApiModule } from '@muni-kypo-crp/sandbox-api';
import { KypoDynamicEnvironment } from '../../../../environments/kypo-dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { ImagesPageModule } from '@muni-kypo-crp/sandbox-agenda/sandbox-images';
import { SandboxImagesOverviewRoutingModule } from './sandbox-images-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    KypoSandboxApiModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxApiConfig),
    ImagesPageModule.forRoot(KypoDynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxImagesOverviewRoutingModule,
  ],
})
export class SandboxImagesOverviewModule {}
