import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceResultsComponent} from './training-instance-results.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceResultsComponent,
    data: { breadcrumb: null }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceResultsRoutingModule {

}
