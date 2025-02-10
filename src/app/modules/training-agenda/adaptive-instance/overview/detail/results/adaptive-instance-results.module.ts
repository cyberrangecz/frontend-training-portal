import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { AdaptiveInstanceResultsRoutingModule } from './adaptive-instance-results-routing.module';
import { AdaptiveInstanceResultsComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-results';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceResultsRoutingModule,
  ],
})
export class AdaptiveInstanceResultsModule {}
