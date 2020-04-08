import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccessTokenDetailComponent} from 'kypo-training-agenda';

const routes: Routes = [
  {
    path: '',
    component: AccessTokenDetailComponent
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
