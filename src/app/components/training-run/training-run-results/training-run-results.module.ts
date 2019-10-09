import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { Kypo2TrainingsVisualizationOverviewLibModule } from 'kypo2-trainings-visualization-overview-lib';
import {environment} from '../../../../environments/environment';
import {TrainingRunResultsMaterialModule} from './training-run-results-material.module';
import {TrainingRunResultsRoutingModule} from './training-run-results-routing.module';
import { TrainingRunResultsComponent } from './training-run-results.component';

/**
 * Module containing components and routing for trainees results in game
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsMaterialModule,
    TrainingRunResultsRoutingModule,
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: environment.trainingRestBasePath})
  ],
  declarations: [TrainingRunResultsComponent],
  providers: []
})
export class TrainingRunResultsModule {

}
