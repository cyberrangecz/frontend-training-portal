import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveInstanceEditOverviewRoutingModule } from './adaptive-instance-edit-overview-routing.module';
import { KypoDynamicEnvironment } from '../../../../../../environments/kypo-dynamic-environment';
import { AdaptiveInstanceEditOverviewComponentsModule } from '@muni-kypo-crp/training-agenda/adaptive-instance-edit';

@NgModule({
  imports: [
    CommonModule,
    AdaptiveInstanceEditOverviewRoutingModule,
    AdaptiveInstanceEditOverviewComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
  ],
})
export class AdaptiveInstanceEditOverviewModule {}
