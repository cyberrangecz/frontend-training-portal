import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDefinitionSummaryRoutingModule } from './training-definition-summary-routing.module';
import { TrainingDefinitionSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/definition-summary';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionSummaryComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionSummaryRoutingModule,
  ],
})
export class TrainingDefinitionSummaryModule {}
