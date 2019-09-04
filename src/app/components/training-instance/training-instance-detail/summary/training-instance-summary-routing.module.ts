import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceSummaryComponent} from './training-instance-summary.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceSummaryComponent,
    data: {breadcrumb: null}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceSummaryRoutingModule {

}
