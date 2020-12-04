import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceEditOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/instance-edit';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceEditOverviewRoutingModule } from './training-instance-edit-overview-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceEditOverviewRoutingModule,
    TrainingInstanceEditOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class TrainingInstanceEditOverviewModule {}
