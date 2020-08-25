import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POOL_DATA_ATTRIBUTE_NAME, POOL_REQUEST_DATA_ATTRIBUTE_NAME } from 'kypo-sandbox-agenda';
import { RequestResolver, PoolResolver } from 'kypo-sandbox-agenda/resolvers';
import { CleanupRequestDetailComponent } from 'kypo-sandbox-agenda/request-detail';

const routes: Routes = [
  {
    path: '',
    component: CleanupRequestDetailComponent,
    resolve: {
      [POOL_DATA_ATTRIBUTE_NAME]: PoolResolver,
      [POOL_REQUEST_DATA_ATTRIBUTE_NAME]: RequestResolver,
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
export class CleanupRequestDetailRoutingModule {}
