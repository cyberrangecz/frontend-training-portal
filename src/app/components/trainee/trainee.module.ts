import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeRoutingModule} from "./trainee-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview/trainee-overview.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    TraineeRoutingModule,
    SharedModule
  ],
  declarations: [
    TraineeOverviewComponent
  ],
  providers: [

  ]
})

export class TraineeModule {

}
