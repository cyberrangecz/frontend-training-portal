import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { AdaptiveInstanceSummaryRoutingModule } from './adaptive-instance-summary-routing.module';
import { AdaptiveInstanceSummaryComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-summary';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceSummaryComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceSummaryRoutingModule,
  ],
})
export class AdaptiveInstanceSummaryModule {}
