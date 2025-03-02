import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptivePreviewRoutingModule } from './adaptive-preview-routing.module';
import { AdaptivePreviewComponentsModule } from '@crczp/training-agenda/adaptive-definition-preview';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        AdaptivePreviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptivePreviewRoutingModule,
    ],
})
export class AdaptivePreviewModule {}
