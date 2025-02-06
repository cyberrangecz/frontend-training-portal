import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoolEditComponent } from '@cyberrangecz-platform/sandbox-agenda/pool-edit';

const routes: Routes = [
  {
    path: '',
    component: PoolEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoolEditRoutingModule {}
