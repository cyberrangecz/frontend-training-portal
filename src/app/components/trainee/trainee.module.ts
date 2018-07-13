import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeRoutingModule} from "./trainee-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview/trainee-overview.component";

@NgModule({
  imports: [
    CommonModule,
    TraineeRoutingModule
  ],
  declarations: [
    TraineeOverviewComponent
  ],
  providers: [

  ]
})

export class TraineeModule {

}
