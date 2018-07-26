import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingSummaryComponent } from './training-summary.component';
import {TrainingSummaryMaterialModule} from "./training-summary-material.module";
import {TrainingSummaryRoutingModule} from "./training-summary-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingSummaryMaterialModule,
    TrainingSummaryRoutingModule
  ],
  declarations: [
  TrainingSummaryComponent
  ],
  providers: [
  ]
})

export class TrainingSummaryModule {}
