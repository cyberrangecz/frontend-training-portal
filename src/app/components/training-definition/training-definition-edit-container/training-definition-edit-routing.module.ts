import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionEditContainerComponent} from './training-definition-edit-container.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {TrainingDefinitionAccessGuard} from '../../../services/guards/training-definition-access-guard.service';
import {LEVELS_PATH} from '../training-definition-overview/paths';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionEditContainerComponent,
    canActivate: [TrainingDefinitionAccessGuard],
    canDeactivate: [TrainingDefinitionLeaveGuard]
  },
  {
    path: LEVELS_PATH,
    loadChildren: () => import('app/components/training-definition/level/level-overview.module').then(m => m.LevelOverviewModule),
    data: { breadcrumb: 'Levels' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionEditRoutingModule {

}
