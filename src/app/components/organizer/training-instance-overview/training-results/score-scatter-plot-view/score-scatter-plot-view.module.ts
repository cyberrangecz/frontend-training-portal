import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ScoreScatterPlotViewComponent } from './score-scatter-plot-view.component';
import {ScoreScatterPlotViewRoutingModule} from "./score-scatter-plot-view-routing.module";
import {ScoreScatterPlotViewMaterialModule} from "./score-scatter-plot-view-material.module";
import {Kypo2TrainingsVisualizationOverviewLibModule} from "kypo2-trainings-visualization-overview-lib";
import {VisualizationOverviewConfig} from "../../../../../model/config/visualization-overview-config";

@NgModule({
  imports: [
    CommonModule,
    ScoreScatterPlotViewRoutingModule,
    ScoreScatterPlotViewMaterialModule,
    Kypo2TrainingsVisualizationOverviewLibModule.forRoot(VisualizationOverviewConfig)
  ],
  declarations: [
  ScoreScatterPlotViewComponent
  ],
  providers: [
  ]
})

export class ScoreScatterPlotViewModule {}
