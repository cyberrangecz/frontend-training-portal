import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ADAPTIVE_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME,
    ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME,
    ADAPTIVE_RUN_PATH,
    ADAPTIVE_RUN_RESULTS_PATH,
    ADAPTIVE_RUN_SELECTOR,
    COOP_TRAINING_RUN_ACCESS_PATH,
    COOP_TRAINING_RUN_RESUME_PATH,
    LINEAR_TRAINING_RUN_ACCESS_PATH,
    LINEAR_TRAINING_RUN_RESUME_PATH,
    MITRE_TECHNIQUES_PATH,
    TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME,
    TRAINING_RUN_ACCESS_SELECTOR,
    TRAINING_RUN_DATA_ATTRIBUTE_NAME,
    TRAINING_RUN_RESULTS_PATH,
    TRAINING_RUN_SELECTOR,
} from '@crczp/training-agenda';
import {
    AccessAdaptiveRunResolver,
    AdaptiveRunResultsResolver,
    CoopTrainingRunResolver,
    LinearTrainingRunResolver,
    TrainingRunResultsResolver,
} from '@crczp/training-agenda/resolvers';
import { TrainingRunOverviewComponent } from '@crczp/training-agenda/run-overview';

const routes: Routes = [
    {
        path: '',
        component: TrainingRunOverviewComponent,
    },
    {
        path: `${ADAPTIVE_RUN_PATH}/${LINEAR_TRAINING_RUN_ACCESS_PATH}/:${TRAINING_RUN_ACCESS_SELECTOR}`,
        loadChildren: () =>
            import('./detail/adaptive/adaptive-run-detail.module').then((m) => m.AdaptiveRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [ADAPTIVE_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: AccessAdaptiveRunResolver },
    },
    {
        path: `${ADAPTIVE_RUN_PATH}/${LINEAR_TRAINING_RUN_RESUME_PATH}/:${TRAINING_RUN_SELECTOR}`,
        loadChildren: () =>
            import('./detail/adaptive/adaptive-run-detail.module').then((m) => m.AdaptiveRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [ADAPTIVE_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: AccessAdaptiveRunResolver },
    },
    {
        path: `${LINEAR_TRAINING_RUN_ACCESS_PATH}/:${TRAINING_RUN_ACCESS_SELECTOR}`,
        loadChildren: () =>
            import('./detail/linear/linear-training-run-detail.module').then((m) => m.LinearTrainingRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: LinearTrainingRunResolver },
    },
    {
        path: `${LINEAR_TRAINING_RUN_RESUME_PATH}/:${TRAINING_RUN_SELECTOR}`,
        loadChildren: () =>
            import('./detail/linear/linear-training-run-detail.module').then((m) => m.LinearTrainingRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: LinearTrainingRunResolver },
    },
    {
        path: `${COOP_TRAINING_RUN_ACCESS_PATH}/:${TRAINING_RUN_ACCESS_SELECTOR}`,
        loadChildren: () =>
            import('./detail/coop/coop-training-run-detail.module').then((m) => m.CoopTrainingRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: CoopTrainingRunResolver },
    },
    {
        path: `${COOP_TRAINING_RUN_RESUME_PATH}/:${TRAINING_RUN_SELECTOR}`,
        loadChildren: () =>
            import('./detail/coop/coop-training-run-detail.module').then((m) => m.CoopTrainingRunDetailModule),
        data: {
            breadcrumb: 'Training',
            title: undefined,
        },
        resolve: { [TRAINING_RUN_ACCESS_INFO_DATA_ATTRIBUTE_NAME]: CoopTrainingRunResolver },
    },
    {
        path: `${TRAINING_RUN_RESULTS_PATH}/:${TRAINING_RUN_SELECTOR}`,
        loadChildren: () =>
            import('./results/linear/training-run-results.module').then((m) => m.TrainingRunResultsModule),
        data: {
            breadcrumb: 'Results',
            title: 'Training Run Results',
        },
        resolve: { [TRAINING_RUN_DATA_ATTRIBUTE_NAME]: TrainingRunResultsResolver },
    },
    {
        path: `${ADAPTIVE_RUN_RESULTS_PATH}/:${ADAPTIVE_RUN_SELECTOR}`,
        loadChildren: () =>
            import('./results/adaptive/adaptive-run-results.module').then((m) => m.AdaptiveRunResultsModule),
        data: {
            breadcrumb: 'Results',
            title: 'Training Run Results',
        },
        resolve: { [ADAPTIVE_RUN_DATA_ATTRIBUTE_NAME]: AdaptiveRunResultsResolver },
    },
    {
        path: `:${MITRE_TECHNIQUES_PATH}`,
        loadChildren: () => import('./mitre-techniques/mitre-techniques.module').then((m) => m.MitreTechniquesModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrainingRunOverviewRoutingModule {}
