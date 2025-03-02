import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingRunResultsComponentsModule } from '@crczp/training-agenda/run-results';
import { PortalDynamicEnvironment } from '../../../../../../../environments/portal-dynamic-environment';
import { TrainingRunResultsRoutingModule } from './training-run-results-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TrainingRunResultsComponentsModule.forRoot(PortalDynamicEnvironment.getConfig().trainingAgendaConfig),
        TrainingRunResultsRoutingModule,
    ],
})
export class TrainingRunResultsModule {}
