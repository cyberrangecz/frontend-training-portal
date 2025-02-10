import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/instance-summary';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { TrainingInstanceSummaryRoutingModule } from './training-instance-summary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceSummaryComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceSummaryRoutingModule,
  ],
})
export class TrainingInstanceSummaryModule {}
