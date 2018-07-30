import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TraineeOverviewRoutingModule} from "./trainee-overview-routing.module";
import {TraineeOverviewComponent} from "./trainee-overview.component";
import {TraineeOverviewMaterialModule} from "./trainee-overview-material.module";

@NgModule({
  imports: [
    CommonModule,
    TraineeOverviewRoutingModule,
    TraineeOverviewMaterialModule
  ],
  declarations: [
    TraineeOverviewComponent
  ],
  providers: [

  ]
})

export class TraineeOverviewModule {

}
