import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  POOL_DATA_ATTRIBUTE_NAME,
  POOL_REQUEST_DATA_ATTRIBUTE_NAME,
  PoolRequestDetailComponent,
  PoolRequestResolver,
  PoolResolver,
} from 'kypo-sandbox-agenda';

const routes: Routes = [
  {
    path: '',
    component: PoolRequestDetailComponent,
    resolve: {
      [POOL_DATA_ATTRIBUTE_NAME]: PoolResolver,
      [POOL_REQUEST_DATA_ATTRIBUTE_NAME]: PoolRequestResolver,
    },
  },
];

/**
 * Routing module for sandbox request detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoolRequestDetailRoutingModule {}
