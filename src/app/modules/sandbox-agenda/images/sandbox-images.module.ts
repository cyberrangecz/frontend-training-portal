import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@cyberrangecz-platform/sandbox-api';
import { DynamicEnvironment } from '../../../../environments/dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { ImagesPageModule } from '@cyberrangecz-platform/sandbox-agenda/sandbox-images';
import { SandboxImagesOverviewRoutingModule } from './sandbox-images-overview-routing.module';

@NgModule({
  imports: [
    SandboxAgendaSharedProvidersModule,
    SandboxApiModule.forRoot(DynamicEnvironment.getConfig().sandboxApiConfig),
    ImagesPageModule.forRoot(DynamicEnvironment.getConfig().sandboxAgendaConfig),
    SandboxImagesOverviewRoutingModule,
  ],
})
export class SandboxImagesOverviewModule {}
