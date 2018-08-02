import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunMaterialModule} from "./training-run-material.module";
import {TrainingRunRoutingModule} from "./training-run-routing.module";
import { TrainingRunComponent } from './training-run.component';
import {ActiveTrainingRunLevelsService} from "../../../services/active-training-run-levels.service";
import {TrainingRunLevelModule} from "./training-run-level/training-run-level.module";
import {PipesModule} from "../../../pipes/pipes.module";
import { TrainingTimerComponent } from './training-timer/training-timer.component';
import {CountdownTimerModule} from "ngx-countdown-timer";
import {TrainingDefinitionGetterService} from "../../../services/data-getters/training-definition-getter.service";
import {TrainingRunLevelsGuard} from "../../../guards/training-run-levels-guard.service";


@NgModule({
  imports: [
    CommonModule,
    TrainingRunMaterialModule,
    TrainingRunRoutingModule,
    TrainingRunLevelModule,
    PipesModule,
    CountdownTimerModule.forRoot()
  ],
  declarations: [
    TrainingRunComponent,
    TrainingTimerComponent,
  ],
  providers: [
    ActiveTrainingRunLevelsService,
    TrainingDefinitionGetterService,
    TrainingRunLevelsGuard
  ]
})
export class TrainingRunModule { }
