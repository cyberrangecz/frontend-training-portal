import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RUNS_PATH,
  TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
  TRAINING_INSTANCE_DETAIL_PATH,
  TRAINING_INSTANCE_EDIT_PATH,
  TRAINING_INSTANCE_NEW_PATH,
  TRAINING_INSTANCE_SELECTOR,
} from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceOverviewComponent } from '@muni-kypo-crp/training-agenda/instance-overview';
import {
  TrainingInstanceBreadcrumbResolver,
  TrainingInstanceDetailBreadcrumbResolver,
  TrainingInstanceDetailTitleResolver,
  TrainingInstanceResolver,
  TrainingInstanceTitleResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent,
  },
  {
    path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_DETAIL_PATH}`,
    loadChildren: () => import('./detail/training-instance-detail.module').then((m) => m.TrainingInstanceDetailModule),
    resolve: {
      [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
      title: TrainingInstanceTitleResolver,
    },
  },
  {
    path: TRAINING_INSTANCE_NEW_PATH,
    loadChildren: () =>
      import('./edit/training-instance-edit-overview.module').then((m) => m.TrainingInstanceEditOverviewModule),
    resolve: {
      [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
      title: TrainingInstanceTitleResolver,
    },
  },
  {
    path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_EDIT_PATH}`,
    loadChildren: () =>
      import('./edit/training-instance-edit-overview.module').then((m) => m.TrainingInstanceEditOverviewModule),
    resolve: {
      [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
      title: TrainingInstanceTitleResolver,
    },
  },
];

/**
 * Routing for training instance module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceOverviewRoutingModule {}
