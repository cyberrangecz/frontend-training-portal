import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveInstanceEditOverviewRoutingModule } from './adaptive-instance-edit-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { AdaptiveInstanceEditOverviewComponentsModule } from '@crczp/training-agenda/adaptive-instance-edit';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceEditOverviewRoutingModule,
        AdaptiveInstanceEditOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
})
export class AdaptiveInstanceEditOverviewModule {}
