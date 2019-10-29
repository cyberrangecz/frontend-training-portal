import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolRequestResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-resolver.service';
import {PoolRequestDetailComponent} from './pool-request-detail.component';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PoolRequestDetailComponent,
    data: {
      breadcrumb: null,
    },
    resolve: {
      pool: PoolResolver,
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
