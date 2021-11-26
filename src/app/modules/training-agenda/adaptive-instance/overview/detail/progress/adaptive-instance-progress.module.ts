import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceProgressComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-progress';
import { AdaptiveInstanceProgressRoutingModule } from './adaptive-instance-progress-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceProgressComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceProgressRoutingModule,
  ],
})
export class AdaptiveInstanceProgressModule {}
