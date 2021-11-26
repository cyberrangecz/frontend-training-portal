import { RouterModule, Routes } from '@angular/router';
import { SUMMARY_PATH, TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/training-agenda';
import { NgModule } from '@angular/core';
import {
  TrainingDefinitionResolver,
  TrainingDefinitionDetailBreadcrumbResolver,
  TrainingDefinitionDetailTitleResolver,
} from '@muni-kypo-crp/training-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: SUMMARY_PATH,
  },
  {
    path: SUMMARY_PATH,
    resolve: {
      [TRAINING_DEFINITION_DATA_ATTRIBUTE_NAME]: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionDetailBreadcrumbResolver,
      title: TrainingDefinitionDetailTitleResolver,
    },
    loadChildren: () =>
      import('./summary/training-definition-summary.module').then((m) => m.TrainingDefinitionSummaryModule),
  },
];

/**
 * Routing module for training defintion detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDefinitionDetailRoutingModule {}
