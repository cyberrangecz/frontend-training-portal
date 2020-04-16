import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingRunResultsComponent } from 'kypo-training-agenda';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunResultsComponent,
  },
];

/**
 * Module containing routing for training run results module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRunResultsRoutingModule {}
