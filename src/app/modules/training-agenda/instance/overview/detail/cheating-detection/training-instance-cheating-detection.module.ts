import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionOverviewRoutingModule } from './training-instance-cheating-detection-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { CheatingDetectionOverviewComponentsModule } from '@crczp/training-agenda/instance-cheating-detection';

@NgModule({
    imports: [
        CommonModule,
        CheatingDetectionOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        CheatingDetectionOverviewRoutingModule,
    ],
})
export class CheatingDetectionOverviewModule {}
