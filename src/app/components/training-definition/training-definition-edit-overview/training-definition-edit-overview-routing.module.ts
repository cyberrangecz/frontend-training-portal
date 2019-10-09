import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';
import {TrainingDefinitionEditOverviewComponent} from './training-definition-edit-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionEditOverviewComponent,
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

export class TrainingDefinitionEditOverviewRoutingModule {

}
