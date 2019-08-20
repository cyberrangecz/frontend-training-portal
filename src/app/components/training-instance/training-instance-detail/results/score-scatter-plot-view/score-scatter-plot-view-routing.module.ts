import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ScoreScatterPlotViewComponent} from "./score-scatter-plot-view.component";

const routes: Routes = [
  {
    path: '',
    component: ScoreScatterPlotViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScoreScatterPlotViewRoutingModule {

}
