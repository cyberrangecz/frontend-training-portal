import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionSummaryRoutingModule } from './adaptive-definition-summary-routing.module';
import { AdaptiveDefinitionSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-summary';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionSummaryComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionSummaryRoutingModule,
  ],
})
export class AdaptiveDefinitionSummaryModule {}
