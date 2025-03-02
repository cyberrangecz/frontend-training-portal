import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceResultsComponentsModule } from '@crczp/training-agenda/instance-results';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingInstanceResultsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingInstanceResultsRoutingModule,
    ],
})
export class TrainingInstanceResultsModule {}
