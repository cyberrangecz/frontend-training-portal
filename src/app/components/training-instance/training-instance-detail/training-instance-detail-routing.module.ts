import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingInstanceDetailComponent} from './training-instance-detail.component';
import {TrainingInstanceGuard} from '../../../services/guards/training-instance-guard.service';
import {
  PROGRESS_PATH,
  RESULTS_PATH,
  SUMMARY_PATH,
  TRAINING_INSTANCE_DETAIL_OUTLET,
  TRAINING_INSTANCE_DETAIL_PATH
} from './paths';
import {ACCESS_TOKEN_PATH} from '../training-instance-overview/paths';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TRAINING_INSTANCE_DETAIL_PATH,
  },
  {
    path: TRAINING_INSTANCE_DETAIL_PATH,
    canActivate: [TrainingInstanceGuard],
    component: TrainingInstanceDetailComponent,
    data: {breadcrumb: null},
    children: [
      {
        path: SUMMARY_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/summary/training-instance-summary.module').then(m => m.TrainingInstanceSummaryModule),
        outlet: TRAINING_INSTANCE_DETAIL_OUTLET
      },
      {
        path: PROGRESS_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/progress/training-instance-progress.module').then(m => m.TrainingInstanceProgressModule),
        outlet: TRAINING_INSTANCE_DETAIL_OUTLET
      },
      {
        path: RESULTS_PATH,
        loadChildren: () => import('app/components/training-instance/training-instance-detail/results/training-instance-results.module').then(m => m.TrainingInstanceResultsModule),
        outlet: TRAINING_INSTANCE_DETAIL_OUTLET
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: SUMMARY_PATH,
        outlet: TRAINING_INSTANCE_DETAIL_OUTLET
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceDetailRoutingModule {

}
