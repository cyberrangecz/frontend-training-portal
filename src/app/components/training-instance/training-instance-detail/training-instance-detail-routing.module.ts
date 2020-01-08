import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ACCESS_TOKEN_PATH,
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH,
} from './paths';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {TrainingInstanceDetailBreadcrumbResolver} from '../../../services/resolvers/training-instance-detail-breadcrumb-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: SUMMARY_PATH,
  },
  {
    path: SUMMARY_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
    },
    loadChildren: () => import('app/components/training-instance/training-instance-detail/summary/training-instance-summary.module').then(m => m.TrainingInstanceSummaryModule),
  },
  {
    path: PROGRESS_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
    },
    loadChildren: () => import('app/components/training-instance/training-instance-detail/progress/training-instance-progress.module').then(m => m.TrainingInstanceProgressModule),
  },
  {
    path: RESULTS_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
    },
    loadChildren: () => import('app/components/training-instance/training-instance-detail/results/training-instance-results.module').then(m => m.TrainingInstanceResultsModule),
  },
  {
    path: ACCESS_TOKEN_PATH,
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceDetailBreadcrumbResolver,
    },
    loadChildren: () => import('app/components/training-instance/training-instance-detail/access-token-detail/access-token-detail.module').then(m => m.AccessTokenDetailModule),
  },
];

/**
 * Routing module for training instance detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceDetailRoutingModule {

}
