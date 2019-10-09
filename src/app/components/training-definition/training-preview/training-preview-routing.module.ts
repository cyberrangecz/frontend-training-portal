import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingPreviewComponent} from './training-preview.component';

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
