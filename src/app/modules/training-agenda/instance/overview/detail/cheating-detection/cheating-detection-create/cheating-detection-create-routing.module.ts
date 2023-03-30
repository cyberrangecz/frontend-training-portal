import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHEATING_DETECTION_PATH } from '@muni-kypo-crp/training-agenda';
import { CheatingDetectionEditComponent } from '@muni-kypo-crp/training-agenda/instance-cheating-detection-edit';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: CheatingDetectionEditComponent,
  },
  {
    path: CHEATING_DETECTION_PATH,
    loadChildren: () =>
      import('../training-instance-cheating-detection.module').then((m) => m.CheatingDetectionOverviewModule),
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheatingDetectionEditRoutingModule {}
