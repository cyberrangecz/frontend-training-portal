import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDefinitionSummaryRoutingModule } from './training-definition-summary-routing.module';
import { TrainingDefinitionSummaryComponentsModule } from '@muni-kypo-crp/training-agenda/definition-summary';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionSummaryComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingDefinitionSummaryRoutingModule,
  ],
})
export class TrainingDefinitionSummaryModule {}
