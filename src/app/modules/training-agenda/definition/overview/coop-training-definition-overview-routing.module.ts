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
    CoopTrainingDefinitionResolver,
    CoopTrainingDefinitionTitleResolver,
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
            import('./edit/coop-training-definition-edit-overview.module').then(
                (m) => m.CoopTrainingDefinitionEditOverviewModule,
            ),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_EDIT_PATH}`,
        loadChildren: () =>
            import('./edit/coop-training-definition-edit-overview.module').then(
                (m) => m.CoopTrainingDefinitionEditOverviewModule,
            ),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_PREVIEW_PATH}`,
        loadChildren: () => import('./preview/coop-training-preview.module').then((m) => m.CoopTrainingPreviewModule),
    },
    {
        path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_DETAIL_PATH}`,
        loadChildren: () =>
            import('./detail/coop-training-definition-detail.module').then((m) => m.CoopTrainingDefinitionDetailModule),
        resolve: {
            [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: CoopTrainingDefinitionResolver,
            breadcrumb: TrainingDefinitionBreadcrumbResolver,
            title: CoopTrainingDefinitionTitleResolver,
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
export class CoopTrainingDefinitionOverviewRoutingModule {}
