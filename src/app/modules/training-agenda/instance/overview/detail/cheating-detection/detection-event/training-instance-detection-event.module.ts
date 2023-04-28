import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceDetectionEventComponentsModule } from '@muni-kypo-crp/training-agenda/instance-detection-event';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceDetectionEventRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventModule {}
