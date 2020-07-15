import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME,
  TRAINING_RUN_ACCESS_PATH,
  TRAINING_RUN_ACCESS_SELECTOR,
  TRAINING_RUN_DATA_ATTRIBUTE_NAME,
  TRAINING_RUN_RESULTS_PATH,
  TRAINING_RUN_RESUME_PATH,
  TRAINING_RUN_SELECTOR,
} from 'kypo-training-agenda';
import { AccessTrainingRunResolver, TrainingRunResultsResolver } from 'kypo-training-agenda/resolvers';
import { TrainingRunOverviewComponent } from 'kypo-training-agenda/run-overview';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunOverviewComponent,
  },
  {
    path: `${TRAINING_RUN_ACCESS_PATH}/:${TRAINING_RUN_ACCESS_SELECTOR}`,
    loadChildren: () => import('./detail/training-run-detail.module').then((m) => m.TrainingRunDetailModule),
    data: {
      breadcrumb: 'Game',
      title: undefined,
    },
    resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: AccessTrainingRunResolver },
  },
  {
    path: `${TRAINING_RUN_RESUME_PATH}/:${TRAINING_RUN_SELECTOR}`,
    loadChildren: () => import('./detail/training-run-detail.module').then((m) => m.TrainingRunDetailModule),
    data: {
      breadcrumb: 'Game',
      title: undefined,
    },
    resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: AccessTrainingRunResolver },
  },
  {
    path: `${TRAINING_RUN_RESULTS_PATH}/:${TRAINING_RUN_SELECTOR}`,
    loadChildren: () => import('./results/training-run-results.module').then((m) => m.TrainingRunResultsModule),
    data: {
      breadcrumb: 'Results',
      title: 'Training Run Results',
    },
    resolve: { [TRAINING_RUN_DATA_ATTRIBUTE_NAME]: TrainingRunResultsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRunOverviewRoutingModule {}
