import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunLevelMaterialModule} from "./training-run-level-material.module";
import {TrainingRunLevelRoutingModule} from "./training-run-level-routing.module";
import { TrainingRunLevelComponent } from './training-run-level.component';
import { TrainingRunInfoLevelComponent } from './training-run-info-level/training-run-info-level.component';
import { TrainingRunGameLevelComponent } from './training-run-game-level/training-run-game-level.component';
import { TrainingRunAssessmentLevelComponent } from './training-run-assessment-level/training-run-assessment-level.component';
import {NgxMdModule} from "ngx-md";

@NgModule({
  imports: [
    CommonModule,
    TrainingRunLevelMaterialModule,
    TrainingRunLevelRoutingModule,
    NgxMdModule.forRoot(),
  ],
  declarations: [
    TrainingRunLevelComponent,
    TrainingRunInfoLevelComponent,
    TrainingRunGameLevelComponent,
    TrainingRunAssessmentLevelComponent,
  ],
  exports: [
    TrainingRunLevelComponent
  ],
  providers: [

  ]
})

export class TrainingRunLevelModule {

}
