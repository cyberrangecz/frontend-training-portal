import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionEditContainerComponent} from './training-definition-edit-container.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionEditContainerComponent,
    resolve: {
      trainingDefinition: TrainingDefinitionResolver,
      breadcrumb: TrainingDefinitionBreadcrumbResolver
    },
    canDeactivate: [TrainingDefinitionLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionEditRoutingModule {

}
