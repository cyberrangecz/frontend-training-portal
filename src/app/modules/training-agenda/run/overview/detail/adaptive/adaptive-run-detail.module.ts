import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveRunDetailRoutingModule } from './adaptive-run-detail-routing.module';
import { AdaptiveRunDetailGameModule } from '@cyberrangecz-platform/training-agenda/adaptive-run-detail';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveRunDetailGameModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveRunDetailRoutingModule,
  ],
})
export class AdaptiveRunDetailModule {}
