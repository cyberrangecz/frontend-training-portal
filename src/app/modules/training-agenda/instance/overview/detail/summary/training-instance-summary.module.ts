import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceSummaryComponentsModule } from '@muni-kypo-crp/training-agenda/instance-summary';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceSummaryRoutingModule } from './training-instance-summary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule,
  ],
})
export class TrainingInstanceSummaryModule {}
