import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';
import {
  ACCESS_TOKEN_PATH,
  TRAINING_INSTANCE_DETAIL_PATH,
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH
} from './paths';


const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent,
    data: { breadcrumb: null }
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
  {
    path: `:id/${ACCESS_TOKEN_PATH}`,
    loadChildren: () => import('app/components/training-instance/access-token-detail/access-token-detail.module').then(m => m.AccessTokenDetailModule),
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceOverviewRoutingModule {

}
