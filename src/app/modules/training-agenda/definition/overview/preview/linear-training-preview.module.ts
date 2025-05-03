import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingPreviewComponentsModule } from '@crczp/training-agenda/definition-preview';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { TrainingPreviewRoutingModule } from './training-preview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingPreviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingPreviewRoutingModule,
    ],
})
export class LinearTrainingPreviewModule {}
