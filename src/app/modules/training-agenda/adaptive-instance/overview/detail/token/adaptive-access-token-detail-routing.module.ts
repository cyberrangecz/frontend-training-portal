import { RouterModule, Routes } from '@angular/router';
import { AdaptiveAccessTokenDetailComponent } from '@muni-kypo-crp/training-agenda/adaptive-instance-access-token';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdaptiveAccessTokenDetailComponent,
  },
];

/**
 * Routing module for access token detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdaptiveAccessTokenDetailRoutingModule {}
