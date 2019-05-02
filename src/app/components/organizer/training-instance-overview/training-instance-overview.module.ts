import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingInstanceOverviewComponent } from './training-instance-overview.component';
import {TrainingInstanceOverviewRoutingModule} from "./training-instance-overview-routing.module";
import {TrainingInstanceOverviewMaterialModule} from "./training-instance-overview-material.module";
import {TrainingInstanceGuardService} from "../../../guards/training-instance-guard.service";

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceOverviewRoutingModule,
    TrainingInstanceOverviewMaterialModule
  ],
  declarations: [
  TrainingInstanceOverviewComponent
  ],
  providers: [
    TrainingInstanceGuardService
  ]
})

export class TrainingInstanceOverviewModule {

}
