import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveInstanceEditOverviewRoutingModule } from './adaptive-instance-edit-overview-routing.module';
import { DynamicEnvironment } from '../../../../../../environments/dynamic-environment';
import { AdaptiveInstanceEditOverviewComponentsModule } from '@cyberrangecz-platform/training-agenda/adaptive-instance-edit';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceEditOverviewRoutingModule,
    AdaptiveInstanceEditOverviewComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceEditOverviewModule {}
