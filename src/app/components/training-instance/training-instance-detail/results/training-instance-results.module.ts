import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingInstanceResultsMaterialModule} from './training-instance-results-material.module';
import {TrainingInstanceResultsRoutingModule} from './training-instance-results-routing.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import {Kypo2TrainingsHurdlingVizLibModule} from 'kypo2-trainings-hurdling-viz-lib';
import {environment} from '../../../../../environments/environment';
import {Kypo2AssessmentsResultsVisualizationModule} from 'kypo2-assessments-results-visualization';
import {Kypo2TrainingsVisualizationOverviewLibModule} from 'kypo2-trainings-visualization-overview-lib';

/**
 * Module containing components and providers for training instance results page
 */
@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsRoutingModule,
    TrainingInstanceResultsMaterialModule,
    Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: environment.trainingRestBasePath}),
    Kypo2AssessmentsResultsVisualizationModule.forRoot({restBaseUrl: environment.trainingRestBasePath}),
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: environment.trainingRestBasePath})
  ],
  declarations: [
    TrainingInstanceResultsComponent
  ],
  providers: [
  ]
})
export class TrainingInstanceResultsModule {

}
