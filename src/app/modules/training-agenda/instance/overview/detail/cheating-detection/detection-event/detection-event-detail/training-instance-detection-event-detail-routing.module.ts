import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInstanceDetectionEventDetailComponent } from '../../../../../../../../../../kypo-training-agenda/instance-detection-event-detail/components/training-instance-detection-event-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceDetectionEventDetailComponent,
  },
];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingInstanceDetectionEventDetailRoutingModule {}
