import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventRoutingModule } from './training-instance-detection-event-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceDetectionEventComponentsModule } from '@crczp/training-agenda/instance-detection-event';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceDetectionEventComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        TrainingInstanceDetectionEventRoutingModule,
    ],
})
export class TrainingInstanceDetectionEventModule {}
