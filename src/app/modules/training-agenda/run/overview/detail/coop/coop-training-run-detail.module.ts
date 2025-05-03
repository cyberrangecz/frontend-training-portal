import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingRunDetailComponentsModule, TrainingRunDetailGameModule } from '@crczp/training-agenda/run-detail';
import { CoopTrainingRunDetailRoutingModule } from './coop-training-run-detail-routing.module';
import { TrainingTypeEnum } from '@crczp/training-model';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingRunDetailComponentsModule,
        TrainingRunDetailGameModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
            TrainingTypeEnum.COOP,
        ),
        CoopTrainingRunDetailRoutingModule,
    ],
})
export class CoopTrainingRunDetailModule {}
