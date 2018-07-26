import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingResultsComponent} from "./training-results.component";

const routes: Routes = [
  {
    path: '',
    component: TrainingResultsComponent,
  },
  {
    path: 'scatter-plot',
    loadChildren: 'app/components/organizer/training-instance-overview/training-results/score-scatter-plot-view/score-scatter-plot-view.module#ScoreScatterPlotViewModule',
    outlet: 'results',
  },
  {
    path: 'score-development',
    loadChildren: 'app/components/organizer/training-instance-overview/training-results/score-development-view/score-development-view.module#ScoreDevelopmentViewModule',
    outlet: 'results',
  },
  {
    path: 'combined',
    loadChildren: 'app/components/organizer/training-instance-overview/training-results/combined-view/combined-view.module#CombinedViewModule',
    outlet: 'results',
  },
  {
    path: 'progress',
    loadChildren: 'app/components/organizer/training-instance-overview/training-results/training-progress-view/training-progress-view.module#TrainingProgressViewModule',
    outlet: 'results',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingResultsRoutingModule {

}
