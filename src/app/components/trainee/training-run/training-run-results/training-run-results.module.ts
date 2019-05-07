import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunResultsMaterialModule} from "./training-run-results-material.module";
import {TrainingRunResultsRoutingModule} from "./training-run-results-routing.module";
import { TrainingRunResultsComponent } from './training-run-results.component';
import { Kypo2TrainingsVisualizationOverviewLibModule } from "kypo2-trainings-visualization-overview-lib";
import {TrainingRunLevelComponentModule} from "../training-run-level/training-run-level-component.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsMaterialModule,
    TrainingRunResultsRoutingModule,
    Kypo2TrainingsVisualizationOverviewLibModule
  ],
  declarations: [TrainingRunResultsComponent],
  providers: []
})
export class TrainingRunResultsModule {

}
