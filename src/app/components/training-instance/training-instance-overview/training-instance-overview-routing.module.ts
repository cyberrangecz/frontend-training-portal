import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {TRAINING_INSTANCE_DETAIL_PATH, TRAINING_INSTANCE_EDIT_PATH, TRAINING_INSTANCE_NEW_PATH} from './paths';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';


const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent,
  },
  {
    path: `:id/${TRAINING_INSTANCE_DETAIL_PATH}`,
    loadChildren: () => import('app/components/training-instance/training-instance-detail/training-instance-detail.module').then(m => m.TrainingInstanceDetailModule),
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
    }
  },
  {
    path: TRAINING_INSTANCE_NEW_PATH,
    loadChildren: () => import('app/components/training-instance/training-instance-edit-overview/training-instance-edit-overview.module').then(m => m.TrainingInstanceEditOverviewModule),
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
    }
  },
  {
    path: `:id/${TRAINING_INSTANCE_EDIT_PATH}`,
    loadChildren: () => import('app/components/training-instance/training-instance-edit-overview/training-instance-edit-overview.module').then(m => m.TrainingInstanceEditOverviewModule),
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
    }
  },
];

/**
 * Routing for training instance module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceOverviewRoutingModule {

}
