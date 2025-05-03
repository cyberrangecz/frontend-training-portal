import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { LinearTrainingInstanceEditOverviewComponentsModule } from '@crczp/training-agenda/instance-edit';
import { LinearTrainingInstanceEditOverviewRoutingModule } from './linear-training-instance-edit-overview-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LinearTrainingInstanceEditOverviewRoutingModule,
        LinearTrainingInstanceEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
    ],
})
export class LinearTrainingInstanceEditOverviewModule {}
