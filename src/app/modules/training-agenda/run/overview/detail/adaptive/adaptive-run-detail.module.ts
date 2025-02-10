import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { AdaptiveRunDetailRoutingModule } from './adaptive-run-detail-routing.module';
import { AdaptiveRunDetailGameModule } from '@cyberrangecz-platform/training-agenda/adaptive-run-detail';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunDetailGameModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveRunDetailRoutingModule,
  ],
})
export class AdaptiveRunDetailModule {}
