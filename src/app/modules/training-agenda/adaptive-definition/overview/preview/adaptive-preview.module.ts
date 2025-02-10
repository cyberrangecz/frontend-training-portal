import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptivePreviewRoutingModule } from './adaptive-preview-routing.module';
import { AdaptivePreviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-preview';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptivePreviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptivePreviewRoutingModule,
  ],
})
export class AdaptivePreviewModule {}
