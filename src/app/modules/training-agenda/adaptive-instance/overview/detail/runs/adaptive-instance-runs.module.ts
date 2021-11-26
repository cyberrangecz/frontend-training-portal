import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceRunsComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-runs';
import { AdaptiveInstanceRunsRoutingModule } from './adaptive-instance-runs-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceRunsComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceRunsRoutingModule,
  ],
})
export class AdaptiveInstanceRunsModule {}
