import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingProgressComponent } from './training-progress.component';
import {TrainingProgressMaterialModule} from "./training-progress-material.module";
import {TrainingProgressRoutingModule} from "./training-progress-routing.module";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";

@NgModule({
  imports: [
    CommonModule,
    TrainingProgressMaterialModule,
    TrainingProgressRoutingModule,
    Kypo2TrainingsHurdlingVizLibModule
  ],
  declarations: [
  TrainingProgressComponent
  ],
  providers: [
  ]
})

export class TrainingProgressModule {

}
