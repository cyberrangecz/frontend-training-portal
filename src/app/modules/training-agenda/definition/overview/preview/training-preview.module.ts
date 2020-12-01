import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingPreviewComponentsModule } from '@kypo/training-agenda/definition-preview';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { TrainingPreviewRoutingModule } from './training-preview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingPreviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingPreviewRoutingModule,
  ],
})
export class TrainingPreviewModule {}
