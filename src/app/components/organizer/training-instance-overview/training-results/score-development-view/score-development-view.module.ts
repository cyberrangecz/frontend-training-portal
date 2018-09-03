import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ScoreDevelopmentViewComponent } from './score-development-view.component';
import {ScoreDevelopmentViewRoutingModule} from "./score-development-view-routing.module";
import {ScoreDevelopmentViewMaterialModule} from "./score-development-view-material.module";
import {Kypo2TrainingsVisualizationOverviewLibModule} from "kypo2-trainings-visualization-overview-lib";

@NgModule({
  imports: [
    CommonModule,
    ScoreDevelopmentViewRoutingModule,
    ScoreDevelopmentViewMaterialModule,
    Kypo2TrainingsVisualizationOverviewLibModule
  ],
  declarations: [
  ScoreDevelopmentViewComponent
  ],
  providers: [
  ]
})

export class ScoreDevelopmentViewModule {

}
