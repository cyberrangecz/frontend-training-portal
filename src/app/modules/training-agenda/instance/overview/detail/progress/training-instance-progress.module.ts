import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceProgressComponentsModule } from '@crczp/training-agenda/instance-progress';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceProgressRoutingModule } from './training-instance-progress-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceProgressComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingInstanceProgressRoutingModule,
    ],
})
export class TrainingInstanceProgressModule {}
