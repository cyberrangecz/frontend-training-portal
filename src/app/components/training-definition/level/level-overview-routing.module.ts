import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LevelOverviewComponent} from './level-overview/level-overview.component';
import {LevelEditGuard} from '../../../services/guards/level-edit-guard.service';
import {LevelEditLeaveGuard} from '../../../services/guards/level-edit-leave-guard.service';
import {ADD_LEVEL_PATH} from '../training-definition-overview/paths';
import {TrainingDefinitionBreadcrumbResolver} from '../../../services/resolvers/training-definition-breadcrumb-resolver.service';
import {TrainingDefinitionResolver} from '../../../services/resolvers/training-definition-resolver.service';


const routes: Routes = [
  {
    path: ':levelId',
    component: LevelOverviewComponent,
    canActivate: [LevelEditGuard],
    canDeactivate: [LevelEditLeaveGuard],
    resolve: {
      breadcrumb: TrainingDefinitionBreadcrumbResolver,
      trainingDefinition: TrainingDefinitionResolver
    }
  },
  {
    path: ADD_LEVEL_PATH,
    component: LevelOverviewComponent,
    canActivate: [LevelEditGuard],
    canDeactivate: [LevelEditLeaveGuard],
    resolve: {
      breadcrumb: TrainingDefinitionBreadcrumbResolver,
      trainingDefinition: TrainingDefinitionResolver
    }
  },
  {
    path: '',
    redirectTo: ADD_LEVEL_PATH,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LevelOverviewRoutingModule {

}
