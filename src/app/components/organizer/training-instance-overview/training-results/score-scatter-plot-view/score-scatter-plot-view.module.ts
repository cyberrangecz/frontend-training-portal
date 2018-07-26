import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ScoreScatterPlotViewComponent } from './score-scatter-plot-view.component';
import {ScoreScatterPlotViewRoutingModule} from "./score-scatter-plot-view-routing.module";
import {ScoreScatterPlotViewMaterialModule} from "./score-scatter-plot-view-material.module";

@NgModule({
  imports: [
    CommonModule,
    ScoreScatterPlotViewRoutingModule,
    ScoreScatterPlotViewMaterialModule
  ],
  declarations: [
  ScoreScatterPlotViewComponent
  ],
  providers: [
  ]
})

export class ScoreScatterPlotViewModule {}
