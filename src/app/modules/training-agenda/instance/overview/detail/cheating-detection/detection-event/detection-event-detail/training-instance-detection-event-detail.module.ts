import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../../environments/environment';
import { TrainingInstanceDetectionEventDetailRoutingModule } from './training-instance-detection-event-detail-routing.module';
import { TrainingInstanceDetectionEventDetailComponentsModule } from '../../../../../../../../../../kypo-training-agenda/instance-detection-event-detail/components/training-instance-detection-event-detail-component.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceDetectionEventDetailComponentsModule.forRoot(environment.trainingAgendaConfig),
    TrainingInstanceDetectionEventDetailRoutingModule,
  ],
})
export class TrainingInstanceDetectionEventDetailModule {}
