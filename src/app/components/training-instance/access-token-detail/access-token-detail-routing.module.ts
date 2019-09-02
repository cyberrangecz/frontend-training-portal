import {RouterModule, Routes} from "@angular/router";
import {TrainingInstanceGuard} from "../../../services/guards/training-instance-guard.service";
import {NgModule} from "@angular/core";
import {AccessTokenDetailComponent} from "./access-token-detail.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [TrainingInstanceGuard],
    component: AccessTokenDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessTokenDetailRoutingModule {

}
