import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingDefinitionDetailComponent} from './training-definition-detail.component';
import {TrainingDefinitionLeaveGuard} from '../../../services/guards/training-definition-leave-guard.service';
import {TrainingDefinitionAccessGuardService} from '../../../services/guards/training-definition-access-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingDefinitionDetailComponent,
    canActivate: [TrainingDefinitionAccessGuardService],
    canDeactivate: [TrainingDefinitionLeaveGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingDefinitionDetailRoutingModule {

}
