import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoolRequestResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-resolver.service';
import {PoolRequestDetailComponent} from './pool-request-detail.component';
import {PoolResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-resolver.service';
import {PoolRequestTypeResolver} from '../../../services/resolvers/sandbox-instance-resolvers/pool-request-type-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PoolRequestDetailComponent,
    resolve: {
      pool: PoolResolver,
      poolRequest: PoolRequestResolver,
      poolRequestType: PoolRequestTypeResolver
    }
  }
  ];

/**
 * Routing module for sandbox request detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolRequestDetailRoutingModule {

}
