import {RouterModule, Routes} from "@angular/router";
import {TrainingInstanceGuardService} from "../../../services/guards/training-instance-guard.service";
import {NgModule} from "@angular/core";
import {AccessTokenDetailComponent} from "./access-token-detail.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [TrainingInstanceGuardService],
    component: AccessTokenDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessTokenDetailRoutingModule {

}
