import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheatingDetectionEditComponent } from '../../../../../../../../../kypo-training-agenda/instance-cheating-detection-edit/src/components/cheating-detection-edit.component';
import { CHEATING_DETECTION_PATH } from '@muni-kypo-crp/training-agenda';

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
