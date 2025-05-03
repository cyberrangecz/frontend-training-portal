import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoopTrainingInstanceEditOverviewRoutingModule } from './coop-training-instance-edit-overview-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../environments/portal-dynamic-environment';
import { CoopTrainingInstanceEditOverviewComponentsModule } from '@crczp/training-agenda/instance-edit';

@NgModule({
    imports: [
        CommonModule,
        CoopTrainingInstanceEditOverviewRoutingModule,
        CoopTrainingInstanceEditOverviewComponentsModule.forRoot(
            PortalDynamicEnvironment.getConfig().trainingAgendaConfig,
        ),
    ],
})
export class CoopTrainingInstanceEditOverviewModule {}
