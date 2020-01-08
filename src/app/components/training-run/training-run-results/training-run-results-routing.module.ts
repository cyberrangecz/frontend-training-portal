import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingRunResultsComponent} from './training-run-results.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingRunResultsComponent,
    data: {breadcrumb: null}
  },
];

/**
 * Module containing routing for training run results module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRunResultsRoutingModule {

}
