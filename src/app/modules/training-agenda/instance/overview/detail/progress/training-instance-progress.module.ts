import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceProgressComponentsModule } from '@kypo/training-agenda/instance-progress';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceProgressRoutingModule } from './training-instance-progress-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceProgressComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceProgressRoutingModule,
  ],
})
export class TrainingInstanceProgressModule {}
