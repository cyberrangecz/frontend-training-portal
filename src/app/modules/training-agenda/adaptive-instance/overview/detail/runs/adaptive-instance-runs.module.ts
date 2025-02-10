import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceRunsComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-runs';
import { AdaptiveInstanceRunsRoutingModule } from './adaptive-instance-runs-routing.module';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceRunsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceRunsRoutingModule,
  ],
})
export class AdaptiveInstanceRunsModule {}
