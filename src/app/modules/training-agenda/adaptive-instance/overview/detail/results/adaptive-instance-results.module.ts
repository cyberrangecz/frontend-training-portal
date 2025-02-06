import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveInstanceResultsRoutingModule } from './adaptive-instance-results-routing.module';
import { AdaptiveInstanceResultsComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-results';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceResultsComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceResultsRoutingModule,
  ],
})
export class AdaptiveInstanceResultsModule {}
