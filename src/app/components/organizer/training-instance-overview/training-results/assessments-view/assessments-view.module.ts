import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssessmentsViewRoutingModule} from './assessments-view-routing.module';
import {Kypo2AssessmentsResultsVisualizationModule} from 'kypo2-assessments-results-visualization';
import {environment} from '../../../../../../environments/environment';
import {AssessmentsViewComponent} from './assessments-view.component';

@NgModule({
  imports: [
    CommonModule,
    AssessmentsViewRoutingModule,
    Kypo2AssessmentsResultsVisualizationModule.forRoot({restBaseUrl: environment.trainingRestBasePath})
  ],
  declarations: [
    AssessmentsViewComponent
  ]
})
export class AssessmentsViewModule {

}
