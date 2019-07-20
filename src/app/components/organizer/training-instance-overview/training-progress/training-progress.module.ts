import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingProgressComponent } from './training-progress.component';
import {TrainingProgressMaterialModule} from "./training-progress-material.module";
import {TrainingProgressRoutingModule} from "./training-progress-routing.module";
import {Kypo2TrainingsHurdlingVizLibModule} from "kypo2-trainings-hurdling-viz-lib";
import {environment} from '../../../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    TrainingProgressMaterialModule,
    TrainingProgressRoutingModule,
    Kypo2TrainingsHurdlingVizLibModule.forRoot({restBaseUrl: environment.trainingRestBasePath})
  ],
  declarations: [
  TrainingProgressComponent
  ],
  providers: [
  ]
})

export class TrainingProgressModule {

}
