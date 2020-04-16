import { NgModule } from '@angular/core';
import { TrainingInstanceDetailComponentsModule } from 'kypo-training-agenda';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { TrainingInstanceDetailRoutingModule } from './training-instance-detail-routing.module';

@NgModule({
  imports: [
    TrainingInstanceDetailComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceDetailRoutingModule,
  ],
})
export class TrainingInstanceDetailModule {}
