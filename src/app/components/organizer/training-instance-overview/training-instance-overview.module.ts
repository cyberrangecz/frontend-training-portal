import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';
import {TrainingInstanceOverviewRoutingModule} from "./training-instance-overview-routing.module";
import {TrainingInstanceOverviewMaterialModule} from "./training-instance-overview-material.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewMaterialModule
  ],
  declarations: [

  TrainingInstanceOverviewComponent],
  providers: [
  ]
})

export class TrainingInstanceOverviewModule {

}
