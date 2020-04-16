import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceProgressComponent } from 'kypo-training-agenda';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceProgressComponent,
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceProgressRoutingModule {}
