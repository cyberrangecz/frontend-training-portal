import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH
} from './paths';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent,
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-overview/training-definition-edit-overview.module').then(m => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: ':id/' + TRAINING_DEFINITION_EDIT_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-overview/training-definition-edit-overview.module').then(m => m.TrainingDefinitionEditOverviewModule),
  },
  {
    path: ':id/' + TRAINING_DEFINITION_PREVIEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-preview/training-preview.module').then(m => m.TrainingPreviewModule),
  }
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingDefinitionOverviewRoutingModule {

}
