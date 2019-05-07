import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunMaterialModule} from "./training-run-material.module";
import {TrainingRunComponent} from "./training-run.component";
import {TrainingTimerComponent} from "./training-timer/training-timer.component";
import {PipesModule} from "../../../pipes/pipes.module";
import {TrainingRunLevelComponentModule} from "./training-run-level/training-run-level-component.module";
import {CountdownTimerModule} from "ngx-countdown-timer";

@NgModule({
  imports: [
    CommonModule,
    CountdownTimerModule,
    TrainingRunMaterialModule,
    TrainingRunLevelComponentModule,
    PipesModule,
  ],
  declarations: [
    TrainingRunComponent,
    TrainingTimerComponent
  ],
  exports: [
    TrainingRunComponent,
    TrainingTimerComponent
  ]
})
export class TrainingRunComponentModule {

}
