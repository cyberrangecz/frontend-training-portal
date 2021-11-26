import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from '@muni-kypo-crp/user-and-group-agenda/user-detail';

const routes: Routes = [
  {
    path: '',
    component: UserDetailComponent,
  },
];

/**
 * Routing module training definition overview
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupDetailRoutingModule {}
