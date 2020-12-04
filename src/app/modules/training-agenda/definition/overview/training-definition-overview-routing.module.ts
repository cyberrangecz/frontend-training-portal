import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH,
  TRAINING_DEFINITION_SELECTOR,
} from '@muni-kypo-crp/training-agenda';
import { TrainingDefinitionOverviewComponent } from '@muni-kypo-crp/training-agenda/definition-overview';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent,
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () =>
      import('./edit/training-definition-edit-overview.module').then((m) => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_EDIT_PATH}`,
    loadChildren: () =>
      import('./edit/training-definition-edit-overview.module').then((m) => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: `:${TRAINING_DEFINITION_SELECTOR}/${TRAINING_DEFINITION_PREVIEW_PATH}`,
    loadChildren: () => import('./preview/training-preview.module').then((m) => m.TrainingPreviewModule),
  },
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingDefinitionOverviewRoutingModule {}
