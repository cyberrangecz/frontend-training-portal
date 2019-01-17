import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunMaterialModule} from "./training-run-material.module";
import {TrainingRunRoutingModule} from "./training-run-routing.module";
import { TrainingRunComponent } from './training-run.component';
import {TrainingRunLevelModule} from "./training-run-level/training-run-level.module";
import {PipesModule} from "../../../pipes/pipes.module";
import { TrainingTimerComponent } from './training-timer/training-timer.component';
import {CountdownTimerModule} from "ngx-countdown-timer";
import {TrainingDefinitionFacade} from "../../../services/facades/training-definition-facade.service";
import {TrainingRunLevelsGuard} from "../../../guards/training-run-levels-guard.service";
import {TrainingDefinitionMapper} from "../../../services/mappers/training-definition-mapper.service";
import {LevelMapper} from "../../../services/mappers/level-mapper.service";
import {TrainingRunMapper} from "../../../services/mappers/training-run-mapper.service";

@NgModule({
  imports: [
    CommonModule,
    TrainingRunMaterialModule,
    TrainingRunRoutingModule,
    TrainingRunLevelModule,
    PipesModule.forRoot(),
    CountdownTimerModule.forRoot()
  ],
  declarations: [
    TrainingRunComponent,
    TrainingTimerComponent
  ],
  providers: [
    TrainingDefinitionFacade,
    TrainingDefinitionMapper,
    TrainingRunMapper,
    LevelMapper,
    TrainingRunLevelsGuard,
  ]
})
export class TrainingRunModule { }
