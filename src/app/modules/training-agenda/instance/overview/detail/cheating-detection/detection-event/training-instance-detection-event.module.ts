import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';
import { DynamicEnvironment } from '../../../../../../../../environments/dynamic-environment';
import { TrainingInstanceDetectionEventComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-detection-event';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceDetectionEventRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventModule {}
