import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunDetailMaterialModule} from "./training-run-detail-material.module";
import {TrainingRunDetailComponent} from "./training-run-detail.component";
import {TrainingTimerComponent} from "./training-timer/training-timer.component";
import {PipesModule} from "../../../pipes/pipes.module";
import {LevelComponentModule} from "./level/level-component.module";
import {RouterModule} from '@angular/router';
import {UserIdModule} from "../../shared/user-id/user-id.module";
import {Kypo2StepperModule} from 'kypo2-stepper';

@NgModule({
  imports: [
    CommonModule,
    UserIdModule,
    TrainingRunDetailMaterialModule,
    RouterModule,
    LevelComponentModule,
    PipesModule,
    Kypo2StepperModule,
  ],
  declarations: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ],
  exports: [
    TrainingRunDetailComponent,
    TrainingTimerComponent
  ]
})
export class TrainingRunDetailComponentModule {

}
