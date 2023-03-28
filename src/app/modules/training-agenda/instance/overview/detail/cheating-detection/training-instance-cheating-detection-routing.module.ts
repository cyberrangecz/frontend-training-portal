import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheatingDetectionOverviewComponent } from '../../../../../../../../kypo-training-agenda/instance-cheating-detection/src/components/cheating-detection-overview.component';
import {
  CHEATING_DETECTION_CREATE_PATH,
  CHEATING_DETECTION_EVENTS_PATH,
  TRAINING_INSTANCE_SELECTOR,
} from '@muni-kypo-crp/training-agenda';

const routes: Routes = [
  {
    path: '',
    component: CheatingDetectionOverviewComponent,
  },
  {
    path: CHEATING_DETECTION_CREATE_PATH,
    loadChildren: () =>
      import('./cheating-detection-create/cheating-detection-create.module').then(
        (m) => m.CheatingDetectionCreateOverviewModule
      ),
    data: {
      title: 'Create Cheating Detection',
      breadcrumb: 'Create',
    },
  },
  {
    path: `:${TRAINING_INSTANCE_SELECTOR}/${CHEATING_DETECTION_EVENTS_PATH}`,
    loadChildren: () =>
      import('./detection-event/training-instance-detection-event.module').then(
        (m) => m.TrainingInstanceDetectionEventModule
      ),
    data: {
      title: 'Detection Events',
      breadcrumb: 'Events',
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
export class CheatingDetectionOverviewRoutingModule {}
