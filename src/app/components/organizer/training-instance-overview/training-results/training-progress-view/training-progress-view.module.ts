import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingProgressViewComponent } from './training-progress-view.component';
import {TrainingProgressViewRoutingModule} from "./training-progress-view-routing.module";
import {TrainingProgressViewMaterialModule} from "./training-progress-view-material.module";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";
import {VisualizationHurdlingConfig} from "../../../../../model/config/visualization-hurdling-config";

@NgModule({
  imports: [
    CommonModule,
    TrainingProgressViewRoutingModule,
    TrainingProgressViewMaterialModule,
    Kypo2TrainingsHurdlingVizLibModule.forRoot(VisualizationHurdlingConfig)
  ],
  declarations: [
  TrainingProgressViewComponent
  ],
  providers: [
  ]
})

export class TrainingProgressViewModule {

}
