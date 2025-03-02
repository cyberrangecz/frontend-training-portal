import { NgModule } from '@angular/core';
import { SandboxApiModule } from '@crczp/sandbox-api';
import { PortalDynamicEnvironment } from '../../../../environments/portal-dynamic-environment';
import { SandboxAgendaSharedProvidersModule } from '../sandbox-agenda-shared-providers.module';
import { ImagesPageModule } from '@crczp/sandbox-agenda/sandbox-images';
import { SandboxImagesOverviewRoutingModule } from './sandbox-images-overview-routing.module';

@NgModule({
    imports: [
        SandboxAgendaSharedProvidersModule,
        SandboxApiModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxApiConfig),
        ImagesPageModule.forRoot(PortalDynamicEnvironment.getConfig().sandboxAgendaConfig),
        SandboxImagesOverviewRoutingModule,
    ],
})
export class SandboxImagesOverviewModule {}
