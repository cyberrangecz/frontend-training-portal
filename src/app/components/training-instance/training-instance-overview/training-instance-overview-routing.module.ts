import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainingInstanceOverviewComponent} from './training-instance-overview.component';
import {TrainingInstanceBreadcrumbResolver} from '../../../services/resolvers/training-instance-breadcrumb-resolver.service';
import {TrainingInstanceResolver} from '../../../services/resolvers/training-instance-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: TrainingInstanceOverviewComponent,
    data: {breadcrumb: null}
  },
  {
    path: ':id',
    loadChildren: () => import('app/components/training-instance/training-instance-detail/training-instance-detail.module').then(m => m.TrainingInstanceDetailModule),
    resolve: {
      trainingInstance: TrainingInstanceResolver,
      breadcrumb: TrainingInstanceBreadcrumbResolver,
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TrainingInstanceOverviewRoutingModule {

}
