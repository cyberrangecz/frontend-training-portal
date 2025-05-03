import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '@crczp/training-agenda/run-detail';
import { LinearTrainingRunDetailRoutingModule } from './linear-training-run-detail-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingRunDetailGameModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
            TrainingTypeEnum.LINEAR,
        ),
        LinearTrainingRunDetailRoutingModule,
    ],
})
export class LinearTrainingRunDetailModule {}
