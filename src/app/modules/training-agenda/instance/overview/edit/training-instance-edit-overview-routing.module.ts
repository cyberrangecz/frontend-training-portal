import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TrainingInstanceCanDeactivate,
  TrainingInstanceEditOverviewComponent,
} from '@cyberrangecz-platform/training-agenda/instance-edit';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceEditOverviewComponent,
    canDeactivate: [TrainingInstanceCanDeactivate],
  },
];

/**
 * Routing module for training instance edit module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceEditOverviewRoutingModule {}
