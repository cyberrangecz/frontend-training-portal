import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunDetailGameModule } from '@crczp/training-agenda/run-detail';
import { TrainingRunDetailRoutingModule } from './training-run-detail-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingRunDetailGameModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingRunDetailRoutingModule,
    ],
})
export class TrainingRunDetailModule {}
