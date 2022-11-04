import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHEATING_DETECTION_EVENT_DETAIL_PATH } from '@muni-kypo-crp/training-agenda';

let TrainingInstanceDetectionEventDetailComponent;
const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceDetectionEventDetailComponent,
  },
  {
    path: CHEATING_DETECTION_EVENT_DETAIL_PATH,
    loadChildren: () =>
      import('./training-instance-detection-event-detail.module').then(
        (m) => m.TrainingInstanceDetectionEventDetailModule
      ),
    data: {
      title: 'Detection Event Detail',
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
