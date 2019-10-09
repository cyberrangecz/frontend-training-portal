import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Kypo2TrainingsVisualizationOverviewLibModule} from 'kypo2-trainings-visualization-overview-lib';
import {environment} from '../../../../../../environments/environment';
import {ScoreDevelopmentViewMaterialModule} from './score-development-view-material.module';
import {ScoreDevelopmentViewRoutingModule} from './score-development-view-routing.module';
import { ScoreDevelopmentViewComponent } from './score-development-view.component';

@NgModule({
  imports: [
    CommonModule,
    ScoreDevelopmentViewRoutingModule,
    ScoreDevelopmentViewMaterialModule,
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot({kypo2TrainingsVisualizationRestBasePath: environment.trainingRestBasePath})
  ],
  declarations: [
  ScoreDevelopmentViewComponent
  ],
  providers: [
  ]
})

export class ScoreDevelopmentViewModule {

}
