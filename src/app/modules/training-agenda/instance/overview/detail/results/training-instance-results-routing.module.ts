import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceResultsComponent } from 'kypo-training-agenda/instance-results';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceResultsComponent,
  },
];

/**
 * Routing module for training instance results
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceResultsRoutingModule {}
