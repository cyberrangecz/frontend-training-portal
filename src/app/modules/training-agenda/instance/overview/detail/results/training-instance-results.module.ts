import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceResultsComponentsModule } from '@kypo/training-agenda/instance-results';
import { KypoDynamicEnvironment } from '../../../../../../../environments/kypo-dynamic-environment';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsComponentsModule.forRoot(KypoDynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceResultsRoutingModule,
  ],
})
export class TrainingInstanceResultsModule {}
