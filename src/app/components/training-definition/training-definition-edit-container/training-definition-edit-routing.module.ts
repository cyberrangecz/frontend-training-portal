import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionEditContainerComponent} from './training-definition-edit-container.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {LEVELS_PATH} from '../training-definition-overview/paths';
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
  {
    path: LEVELS_PATH,
    loadChildren: () => import('app/components/training-definition/level/level-overview.module').then(m => m.LevelOverviewModule),
    resolve: {
      trainingDefinition: TrainingDefinitionResolver,
    },
    data: {
      breadcrumb: null
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionEditRoutingModule {

}
