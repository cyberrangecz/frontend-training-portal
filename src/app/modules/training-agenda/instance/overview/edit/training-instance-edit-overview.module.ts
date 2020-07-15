import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceEditOverviewComponentsModule } from 'kypo-training-agenda/instance-edit';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { TrainingInstanceEditOverviewRoutingModule } from './training-instance-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingInstanceEditOverviewModule {}
