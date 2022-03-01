import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptivePreviewRoutingModule } from './adaptive-preview-routing.module';
import { AdaptivePreviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-definition-preview';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptivePreviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptivePreviewRoutingModule,
  ],
})
export class AdaptivePreviewModule {}
