import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDefinitionOverviewComponent } from '@crczp/training-agenda/definition-overview';
import {
    DEFINITION_NEW_PATH,
    TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME,
    TRAINING_DEFINITION_DETAIL_PATH,
    TRAINING_DEFINITION_EDIT_PATH,
    TRAINING_DEFINITION_PREVIEW_PATH,
    TRAINING_DEFINITION_SELECTOR,
} from '@crczp/training-agenda';
import {
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
    TrainingDefinitionBreadcrumbResolver,
} from '@crczp/training-agenda/resolvers';

const routes: Routes = [
    {
        path: '',
        component: TrainingDefinitionOverviewComponent,
    },
    {
        path: DEFINITION_NEW_PATH,
        loadChildren: () =>
            import('./edit/linear-training-definition-edit-overview.module').then(
                (m) => m.LinearTrainingDefinitionEditOverviewModule,
            ),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_EDIT_PATH}`,
        loadChildren: () =>
            import('./edit/linear-training-definition-edit-overview.module').then(
                (m) => m.LinearTrainingDefinitionEditOverviewModule,
            ),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_PREVIEW_PATH}`,
        loadChildren: () =>
            import('./preview/linear-training-preview.module').then((m) => m.LinearTrainingPreviewModule),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_DETAIL_PATH}`,
        loadChildren: () =>
            import('./detail/linear-training-definition-detail.module').then(
                (m) => m.LinearTrainingDefinitionDetailModule,
            ),
        resolve: {
            [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: LinearTrainingDefinitionResolver,
            breadcrumb: TrainingDefinitionBreadcrumbResolver,
            title: LinearTrainingDefinitionTitleResolver,
        },
    },
];

/**
 * Routing module training definition overview
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LinearTrainingDefinitionOverviewRoutingModule {}
