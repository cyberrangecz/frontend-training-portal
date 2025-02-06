import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveDefinitionSummaryRoutingModule } from './adaptive-definition-summary-routing.module';
import { AdaptiveDefinitionSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-definition-summary';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveDefinitionSummaryComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveDefinitionSummaryRoutingModule,
  ],
})
export class AdaptiveDefinitionSummaryModule {}
