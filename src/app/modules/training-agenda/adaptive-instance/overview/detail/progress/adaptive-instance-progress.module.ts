import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdaptiveInstanceProgressComponentsModule } from '@crczp/training-agenda/adaptive-instance-progress';
import { AdaptiveInstanceProgressRoutingModule } from './adaptive-instance-progress-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        AdaptiveInstanceProgressComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        AdaptiveInstanceProgressRoutingModule,
    ],
})
export class AdaptiveInstanceProgressModule {}
