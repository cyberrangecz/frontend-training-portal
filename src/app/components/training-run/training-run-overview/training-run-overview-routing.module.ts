import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TRAINING_RUN_GAME_PATH, TRAINING_RUN_RESULTS_PATH} from './paths';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunOverviewComponent
  },
  {
    path: ':id/' + TRAINING_RUN_GAME_PATH,
    loadChildren: () => import('app/components/training-run/training-run-detail/training-run-detail.module').then(m => m.TrainingRunDetailModule),
  },
  {
    path: ':id/' + TRAINING_RUN_RESULTS_PATH,
    loadChildren: () => import('app/components/training-run/training-run-detail/results/training-run-results.module').then(m => m.TrainingRunResultsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRunOverviewRoutingModule {

}
