import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceProgressComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-progress';
import { AdaptiveInstanceProgressRoutingModule } from './adaptive-instance-progress-routing.module';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceProgressComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    AdaptiveInstanceProgressRoutingModule,
  ],
})
export class AdaptiveInstanceProgressModule {}
