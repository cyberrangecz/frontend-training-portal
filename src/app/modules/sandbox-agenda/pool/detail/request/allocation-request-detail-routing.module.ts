import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POOL_DATA_ATTRIBUTE_NAME, POOL_REQUEST_DATA_ATTRIBUTE_NAME } from '@muni-kypo-crp/sandbox-agenda';
import { AllocationRequestDetailComponent } from '@muni-kypo-crp/sandbox-agenda/request-detail';
import { PoolResolver, RequestResolver } from '@muni-kypo-crp/sandbox-agenda/resolvers';

const routes: Routes = [
  {
    path: '',
    component: AllocationRequestDetailComponent,
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
export class AllocationRequestDetailRoutingModule {}
