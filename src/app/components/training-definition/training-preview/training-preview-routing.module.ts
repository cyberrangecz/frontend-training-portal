import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingPreviewComponent} from './training-preview.component';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingPreviewComponent,
    resolve: {
      trainingDefinition: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingPreviewRoutingModule {

}
