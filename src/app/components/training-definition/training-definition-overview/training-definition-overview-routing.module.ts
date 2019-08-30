import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';
import {
  LEVELS_PATH,
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH
} from './paths';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-container/training-definition-edit.module').then(m => m.TrainingDefinitionEditModule),
    data: {breadcrumb: 'New'}
  },
  {
    path: ':id/' + TRAINING_DEFINITION_EDIT_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-container/training-definition-edit.module').then(m => m.TrainingDefinitionEditModule),
    data: {breadcrumb: 'Edit'}
  },
  {
    path: ':id/' + TRAINING_DEFINITION_PREVIEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-preview/training-preview.module').then(m => m.TrainingPreviewModule),
    data: {breadcrumb: 'Preview'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionOverviewRoutingModule {

}
