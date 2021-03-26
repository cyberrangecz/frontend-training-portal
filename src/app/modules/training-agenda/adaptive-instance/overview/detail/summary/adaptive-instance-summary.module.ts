import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveInstanceSummaryRoutingModule } from './adaptive-instance-summary-routing.module';
import { AdaptiveInstanceSummaryComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-summary';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceSummaryComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceSummaryRoutingModule,
  ],
})
export class AdaptiveInstanceSummaryModule {}
