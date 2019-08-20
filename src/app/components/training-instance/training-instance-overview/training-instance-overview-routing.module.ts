import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import {ACCESS_TOKEN_ROUTE} from './paths';


const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent
  },
  {
    path: ':id',
    loadChildren: () => import('app/components/training-instance/training-instance-detail/training-instance-detail.module').then(m => m.TrainingInstanceDetailModule),
  },
  {
    path: ':id/' + ACCESS_TOKEN_ROUTE,
    loadChildren: () => import('app/components/training-instance/access-token-detail/access-token-detail.module').then(m => m.AccessTokenDetailModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceOverviewRoutingModule {

}
