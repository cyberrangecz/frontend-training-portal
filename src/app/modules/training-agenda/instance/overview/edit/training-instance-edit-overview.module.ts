import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceEditOverviewComponentsModule } from '@crczp/training-agenda/instance-edit';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceEditOverviewRoutingModule } from './training-instance-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceEditOverviewRoutingModule,
        TrainingInstanceEditOverviewComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
    ],
})
export class TrainingInstanceEditOverviewModule {}
