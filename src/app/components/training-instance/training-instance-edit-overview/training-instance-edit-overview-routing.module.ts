import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceCanDeactivate} from '../../../services/guards/training-instance-can-deactivate.service';
import {TrainingInstanceEditOverviewComponent} from './training-instance-edit-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceEditOverviewComponent,
    canDeactivate: [TrainingInstanceCanDeactivate],
    data: { breadcrumb: null }
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TrainingInstanceEditOverviewRoutingModule {
}
