import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceResultsComponent} from './training-instance-results.component';
import {
  VIZ_ASSESSMENTS_PATH,
  VIZ_COMBINED_PATH, VIZ_PROGRESS_PATH,
  VIZ_SCORE_DEVELOPMENT_PATH,
  VIZ_SCORE_SCATTER_PLOT_PATH,
  TRAINING_INSTANCE_RESULTS_OUTLET,
  TRAINING_INSTANCE_RESULTS_VISUALIZATION_PATH
} from './paths';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TRAINING_INSTANCE_RESULTS_VISUALIZATION_PATH,
  },
  {
    path: TRAINING_INSTANCE_RESULTS_VISUALIZATION_PATH,
    component: TrainingInstanceResultsComponent,
    children: [
      {
        path: VIZ_SCORE_SCATTER_PLOT_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/score-scatter-plot-view/score-scatter-plot-view.module').then(m => m.ScoreScatterPlotViewModule),
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
      {
        path: VIZ_SCORE_DEVELOPMENT_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/score-development-view/score-development-view.module').then(m => m.ScoreDevelopmentViewModule),
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
      {
        path: VIZ_COMBINED_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/combined-view/combined-view.module').then(m => m.CombinedViewModule),
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
      {
        path: VIZ_PROGRESS_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/progress-view/progress-view.module').then(m => m.ProgressViewModule),
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
      {
        path: VIZ_ASSESSMENTS_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/assessments-view/assessments-view.module').then(m => m.AssessmentsViewModule),
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: VIZ_SCORE_DEVELOPMENT_PATH,
        outlet: TRAINING_INSTANCE_RESULTS_OUTLET,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceResultsRoutingModule {

}
