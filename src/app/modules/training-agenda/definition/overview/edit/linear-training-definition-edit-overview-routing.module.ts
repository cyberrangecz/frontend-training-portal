import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    TrainingDefinitionCanDeactivate,
    TrainingDefinitionEditOverviewComponent,
} from '@crczp/training-agenda/definition-edit';
import { TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@crczp/training-agenda';
import {
    TrainingDefinitionBreadcrumbResolver,
    LinearTrainingDefinitionResolver,
    LinearTrainingDefinitionTitleResolver,
} from '@crczp/training-agenda/resolvers';

const routes: Routes = [
    {
        path: '',
        component: TrainingDefinitionEditOverviewComponent,
        resolve: {
            [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: LinearTrainingDefinitionResolver,
            breadcrumb: TrainingDefinitionBreadcrumbResolver,
            title: LinearTrainingDefinitionTitleResolver,
        },
        canDeactivate: [TrainingDefinitionCanDeactivate],
    },
];

/**
 * Routing for training definition edit overview
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LinearTrainingDefinitionEditOverviewRoutingModule {}
