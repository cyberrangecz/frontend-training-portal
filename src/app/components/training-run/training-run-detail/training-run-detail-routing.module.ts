import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingRunLevelsGuard} from '../../../services/guards/training-run-levels-guard.service';
import {TrainingRunDetailComponent} from './training-run-detail.component';
const routes: Routes = [
  {
    path: '',
    component: TrainingRunDetailComponent,
    canActivate: [TrainingRunLevelsGuard],
    canDeactivate: [TrainingRunLevelsGuard],
    data: {breadcrumb: null}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunDetailRoutingModule {

}
