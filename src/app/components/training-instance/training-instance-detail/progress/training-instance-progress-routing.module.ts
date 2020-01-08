import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceProgressComponent} from './training-instance-progress.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceProgressComponent,
    data: { breadcrumb: null }
  },

];

/**
 * Routing module for training instance progress
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInstanceProgressRoutingModule {

}
