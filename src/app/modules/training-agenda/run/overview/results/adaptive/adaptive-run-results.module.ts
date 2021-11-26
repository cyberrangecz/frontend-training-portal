import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveRunResultsComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-run-results';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveRunResultsRoutingModule } from './adaptive-run-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunResultsComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveRunResultsRoutingModule,
  ],
})
export class AdaptiveRunResultsModule {}
