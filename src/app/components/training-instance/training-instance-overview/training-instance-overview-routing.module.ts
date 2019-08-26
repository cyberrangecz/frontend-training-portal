import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';


const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent
  },
  {
    path: ':id',
    loadChildren: () => import('app/components/training-instance/training-instance-detail/training-instance-detail.module').then(m => m.TrainingInstanceDetailModule),
    data: {breadcrumb: 'Detail'}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceOverviewRoutingModule {

}
