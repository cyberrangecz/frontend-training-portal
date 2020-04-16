import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrainingInstanceResultsComponentsModule } from 'kypo-training-agenda';
import { DynamicEnvironment } from '../../../../../../../environments/dynamic-environment';
import { TrainingInstanceResultsRoutingModule } from './training-instance-results-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsComponentsModule.forRoot(DynamicEnvironment.getConfig().trainingAgendaConfig),
    TrainingInstanceResultsRoutingModule,
  ],
})
export class TrainingInstanceResultsModule {}
