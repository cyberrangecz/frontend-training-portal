import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingPreviewComponent} from './training-preview.component';
import {TrainingPreviewGuard} from '../../../services/guards/training-preview-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingPreviewComponent,
    canActivate: [TrainingPreviewGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingPreviewRoutingModule {

}
