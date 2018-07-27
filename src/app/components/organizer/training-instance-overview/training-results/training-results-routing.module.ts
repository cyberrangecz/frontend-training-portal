import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingResultsComponent} from "./training-results.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'visualization',
        component: TrainingResultsComponent,
        children: [
          {
            path: 'scatter-plot',
            loadChildren: 'app/components/organizer/training-instance-overview/training-results/score-scatter-plot-view/score-scatter-plot-view.module#ScoreScatterPlotViewModule',
            outlet: 'view',
          },
          {
            path: 'score-development',
            loadChildren: 'app/components/organizer/training-instance-overview/training-results/score-development-view/score-development-view.module#ScoreDevelopmentViewModule',
            outlet: 'view',
          },
          {
            path: 'combined',
            loadChildren: 'app/components/organizer/training-instance-overview/training-results/combined-view/combined-view.module#CombinedViewModule',
            outlet: 'view',
          },
          {
            path: 'progress',
            loadChildren: 'app/components/organizer/training-instance-overview/training-results/training-progress-view/training-progress-view.module#TrainingProgressViewModule',
            outlet: 'view',
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingResultsRoutingModule {

}
