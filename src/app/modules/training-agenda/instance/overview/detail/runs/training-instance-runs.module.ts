import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceRunsComponentsModule } from '@crczp/training-agenda/instance-runs';
import { TrainingInstanceRunsRoutingModule } from './training-instance-runs-routing.module';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceRunsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingInstanceRunsRoutingModule,
    ],
})
export class TrainingInstanceRunsModule {}
