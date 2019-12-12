import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainingInstanceGuard} from '../../../../services/guards/training-instance-guard.service';
import {AccessTokenDetailComponent} from './access-token-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [TrainingInstanceGuard],
    component: AccessTokenDetailComponent,
    data: { breadcrumb: null }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessTokenDetailRoutingModule {

}
