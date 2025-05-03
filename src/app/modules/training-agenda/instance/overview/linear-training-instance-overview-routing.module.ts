import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME,
    TRAINING_INSTANCE_DETAIL_PATH,
    TRAINING_INSTANCE_EDIT_PATH,
    TRAINING_INSTANCE_NEW_PATH,
    TRAINING_INSTANCE_SELECTOR,
} from '@crczp/training-agenda';
import {
    LinearTrainingInstanceResolver,
    TrainingInstanceBreadcrumbResolver,
    TrainingInstanceTitleResolver,
} from '@crczp/training-agenda/resolvers';
import { LinearTrainingInstanceOverviewComponent } from '@crczp/training-agenda/instance-overview';

const routes: Routes = [
    {
        path: '',
        component: LinearTrainingInstanceOverviewComponent,
    },
    {
        path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_DETAIL_PATH}`,
        loadChildren: () =>
            import('./detail/linear-training-instance-detail.module').then((m) => m.LinearTrainingInstanceDetailModule),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: LinearTrainingInstanceResolver,
            breadcrumb: TrainingInstanceBreadcrumbResolver,
            title: TrainingInstanceTitleResolver,
        },
    },
    {
        path: TRAINING_INSTANCE_NEW_PATH,
        loadChildren: () =>
            import('./edit/linear-training-instance-edit-overview.module').then(
                (m) => m.LinearTrainingInstanceEditOverviewModule,
            ),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: LinearTrainingInstanceResolver,
            breadcrumb: TrainingInstanceBreadcrumbResolver,
            title: TrainingInstanceTitleResolver,
        },
    },
    {
        path: `:${TRAINING_INSTANCE_SELECTOR}/${TRAINING_INSTANCE_EDIT_PATH}`,
        loadChildren: () =>
            import('./edit/linear-training-instance-edit-overview.module').then(
                (m) => m.LinearTrainingInstanceEditOverviewModule,
            ),
        resolve: {
            [TRAINING_INSTANCE_DATA_ATTRIBUTE_NAME]: LinearTrainingInstanceResolver,
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
export class LinearTrainingInstanceOverviewRoutingModule {}
