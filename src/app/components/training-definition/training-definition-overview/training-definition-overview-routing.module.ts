import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingDefinitionOverviewComponent} from './training-definition-overview.component';
import {
  TRAINING_DEFINITION_EDIT_PATH,
  TRAINING_DEFINITION_NEW_PATH,
  TRAINING_DEFINITION_PREVIEW_PATH
} from './paths';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionOverviewComponent,
    data: {
      breadcrumb: null
    }
  },
  {
    path: TRAINING_DEFINITION_NEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-container/training-definition-edit.module').then(m => m.TrainingDefinitionEditModule),
    data: {
      breadcrumb: null
    }
  },
  {
    path: ':id/' + TRAINING_DEFINITION_EDIT_PATH,
    loadChildren: () => import('app/components/training-definition/training-definition-edit-container/training-definition-edit.module').then(m => m.TrainingDefinitionEditModule),
    data: {
      breadcrumb: null
    }
  },
  {
    path: ':id/' + TRAINING_DEFINITION_PREVIEW_PATH,
    loadChildren: () => import('app/components/training-definition/training-preview/training-preview.module').then(m => m.TrainingPreviewModule),
    data: {
      breadcrumb: null
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionOverviewRoutingModule {

}
