import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceProgressComponentsModule } from '@crczp/training-agenda/instance-progress';
import { InstanceProgressRoutingModule } from './instance-progress-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceProgressComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
            TrainingTypeEnum.COOP,
        ),
        InstanceProgressRoutingModule,
    ],
})
export class CoopInstanceProgressModule {}
