import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrainingRunMaterialModule} from "./training-run-material.module";
import {TrainingRunRoutingModule} from "./training-run-routing.module";
import { TrainingRunComponent } from './training-run.component';
import {TrainingRunLevelModule} from "./training-run-level/training-run-level.module";
import {PipesModule} from "../../../pipes/pipes.module";
import { TrainingTimerComponent } from './training-timer/training-timer.component';
import {CountdownTimerModule} from "ngx-countdown-timer";
import {TrainingRunLevelsGuard} from "../../../services/guards/training-run-levels-guard.service";
import {TrainingDefinitionFacadeModule} from '../../../services/facades/modules/training-definition-facade.module';
import {TrainingRunFacadeModule} from '../../../services/facades/modules/training-run-facade.module';
import {TrainingRunComponentModule} from "./training-run-component.module";

@NgModule({
  imports: [
    CommonModule,
    CountdownTimerModule.forRoot(),
    TrainingRunLevelModule,
    TrainingRunComponentModule,
    TrainingDefinitionFacadeModule,
    TrainingRunFacadeModule,
    TrainingRunRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    TrainingRunLevelsGuard,
  ]
})
export class TrainingRunModule { }
