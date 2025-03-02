import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheatingDetectionEditRoutingModule } from './cheating-detection-create-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceCheatingDetectionEditComponentsModule } from '@crczp/training-agenda/instance-cheating-detection-edit';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceCheatingDetectionEditComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        CheatingDetectionEditRoutingModule,
    ],
})
export class CheatingDetectionCreateOverviewModule {}
