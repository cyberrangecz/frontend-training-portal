import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOverviewComponent } from 'kypo-user-and-group-agenda/user-overview';

const routes: Routes = [
  {
    path: '',
    component: UserOverviewComponent,
  },
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOverviewRoutingModule {}
