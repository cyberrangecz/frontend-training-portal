import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventComponentsModule } from '../../../../../../../../../kypo-training-agenda/instance-detection-event/src/components/training-instance-detection-event-component.module';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetectionEventRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventModule {}
