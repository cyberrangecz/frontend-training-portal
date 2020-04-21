import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MicroserviceEditCanDeactivate, MicroserviceEditOverviewComponent } from 'kypo-user-and-group-agenda';

const routes: Routes = [
  {
    path: '',
    component: MicroserviceEditOverviewComponent,
    canDeactivate: [MicroserviceEditCanDeactivate],
  },
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicroserviceNewRoutingModule {}
