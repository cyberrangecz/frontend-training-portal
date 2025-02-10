import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveRunResultsComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-run-results';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { AdaptiveRunResultsRoutingModule } from './adaptive-run-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveRunResultsRoutingModule,
  ],
})
export class AdaptiveRunResultsModule {}
