import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TraineeOverviewComponent} from "./trainee-overview/trainee-overview.component";

const routes: Routes = [
  {
    path: '',
    component: TraineeOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TraineeRoutingModule {

}
