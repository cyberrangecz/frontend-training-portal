import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHEATING_DETECTION_EVENTS_PATH } from '@muni-kypo-crp/training-agenda';
import { TrainingInstanceDetectionEventComponent } from '@muni-kypo-crp/training-agenda/instance-detection-event';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceDetectionEventComponent,
  },
  {
    path: CHEATING_DETECTION_EVENTS_PATH,
    loadChildren: () =>
      import('./training-instance-detection-event.module').then((m) => m.TrainingInstanceDetectionEventModule),
    data: {
      title: 'Detection Events of Cheating Detection',
    },
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceDetectionEventRoutingModule {}
