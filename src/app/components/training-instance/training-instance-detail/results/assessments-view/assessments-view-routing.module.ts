import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssessmentsViewComponent} from './assessments-view.component';

const routes: Routes = [
  {
    path: '',
    component: AssessmentsViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssessmentsViewRoutingModule {

}
