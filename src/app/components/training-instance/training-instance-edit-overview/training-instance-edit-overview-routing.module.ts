import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceLeaveGuardService} from '../../../services/guards/training-instance-leave-guard.service';
import {TrainingInstanceEditOverviewComponent} from './training-instance-edit-overview/training-instance-edit-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceEditOverviewComponent,
    canDeactivate: [TrainingInstanceLeaveGuardService],
    data: { breadcrumb: null }
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TrainingInstanceEditOverviewRoutingModule {
}
