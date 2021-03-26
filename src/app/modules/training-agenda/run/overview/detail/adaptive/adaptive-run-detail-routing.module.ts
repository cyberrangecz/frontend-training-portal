import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  AdaptiveRunPhasesDeactivateGuard,
  AdaptiveRunDetailComponent,
} from '@muni-kypo-crp/training-agenda/adaptive-run-detail';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveRunDetailComponent,
    canDeactivate: [AdaptiveRunPhasesDeactivateGuard],
  },
];

/**
 * Routing for adaptive run detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveRunDetailRoutingModule {}
