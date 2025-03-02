import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceDetectionEventDetailRoutingModule } from './training-instance-detection-event-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceDetectionEventDetailComponentsModule } from '@crczp/training-agenda/instance-detection-event-detail';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceDetectionEventDetailComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
        TrainingInstanceDetectionEventDetailRoutingModule,
    ],
})
export class TrainingInstanceDetectionEventDetailModule {}
