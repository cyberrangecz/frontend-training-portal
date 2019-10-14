import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolRequestResolver} from '../../../services/resolvers/pool-request-resolver.service';
import {PoolRequestDetailComponent} from './pool-request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PoolRequestDetailComponent,
    data: {
      breadcrumb: null,
    },
    resolve: {
      poolRequest: PoolRequestResolver,
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolRequestDetailRoutingModule {

}
