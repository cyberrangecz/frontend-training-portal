import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventDetailRoutingModule } from './training-instance-detection-event-detail-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceDetectionEventDetailComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-detection-event-detail';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventDetailComponentsModule.forRoot(
      KypoDynamicEnvironment.getConfig().trainingAgendaConfig,
    ),
    TrainingInstanceDetectionEventDetailRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventDetailModule {}
