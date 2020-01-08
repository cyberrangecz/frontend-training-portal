import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessTokenDetailComponent} from './access-token-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AccessTokenDetailComponent,
    data: { breadcrumb: null }
  }
];

/**
 * Routing module for access token detail module
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessTokenDetailRoutingModule {

}
