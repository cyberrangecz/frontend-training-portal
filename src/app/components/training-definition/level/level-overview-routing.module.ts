import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LevelOverviewComponent} from './level-overview/level-overview.component';
import {LevelEditGuard} from '../../../services/guards/level-edit-guard.service';
import {LevelEditLeaveGuard} from '../../../services/guards/level-edit-leave-guard.service';
import {ADD_LEVEL_PATH, LEVELS_PATH} from '../training-definition-overview/paths';


const routes: Routes = [
  {
    path: ':levelId',
    component: LevelOverviewComponent,
    canActivate: [LevelEditGuard],
    canDeactivate: [LevelEditLeaveGuard]
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
