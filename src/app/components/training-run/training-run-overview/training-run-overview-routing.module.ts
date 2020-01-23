import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingRunOverviewComponent} from './training-run-overview.component';
import {TRAINING_RUN_GAME_PATH, TRAINING_RUN_RESULTS_PATH} from './paths';
import {TrainingRunResolver} from '../../../services/resolvers/training-run-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunOverviewComponent,
  },
  {
    path: ':id/' + TRAINING_RUN_GAME_PATH,
    loadChildren: () => import('app/components/training-run/training-run-detail/training-run-detail.module').then(m => m.TrainingRunDetailModule),
    data: {breadcrumb: 'Game'}

  },
  {
    path: ':id/' + TRAINING_RUN_RESULTS_PATH,
    loadChildren: () => import('app/components/training-run/training-run-results/training-run-results.module').then(m => m.TrainingRunResultsModule),
    data: {breadcrumb: 'Results'},
    resolve: { trainingRun: TrainingRunResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingRunOverviewRoutingModule {

}
