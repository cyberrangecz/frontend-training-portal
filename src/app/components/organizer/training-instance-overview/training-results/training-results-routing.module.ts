import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TrainingResultsComponent} from "./training-results.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'viz',
  },
  {
    path: 'viz',
    component: TrainingResultsComponent,
    children: [
      {
        path: 'scatter-plot',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/score-scatter-plot-view/score-scatter-plot-view.module').then(m => m.ScoreScatterPlotViewModule),
        outlet: 'view',
      },
      {
        path: 'score-development',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/score-development-view/score-development-view.module').then(m => m.ScoreDevelopmentViewModule),
        outlet: 'view',
      },
      {
        path: 'combined',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/combined-view/combined-view.module').then(m => m.CombinedViewModule),
        outlet: 'view',
      },
      {
        path: 'progress',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/training-progress-view/training-progress-view.module').then(m => m.TrainingProgressViewModule),
        outlet: 'view',
      },
      {
        path: 'assessments',
        loadChildren: () => import('app/components/organizer/training-instance-overview/training-results/assessments-view/assessments-view.module').then(m => m.AssessmentsViewModule),
        outlet: 'view',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'score-development',
        outlet: 'view',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingResultsRoutingModule {

}
