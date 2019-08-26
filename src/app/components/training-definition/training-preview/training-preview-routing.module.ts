import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingPreviewComponent} from './training-preview.component';
import {TrainingDefinitionAccessGuardService} from '../../../services/guards/training-definition-access-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TrainingPreviewComponent,
    canActivate: [TrainingDefinitionAccessGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingPreviewRoutingModule {

}
