import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingRunLevelsDeactivateGuard} from '../../../services/guards/training-run-levels-guard.service';
import {TrainingRunDetailComponent} from './training-run-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunDetailComponent,
    canDeactivate: [TrainingRunLevelsDeactivateGuard],
  }
];

/**
 * Routing for training run detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunDetailRoutingModule {

}
