import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunLevelMaterialModule} from "./training-run-level-material.module";
import {TrainingRunLevelRoutingModule} from "./training-run-level-routing.module";
import { TrainingRunLevelComponent } from './training-run-level.component';
import { TrainingRunInfoLevelComponent } from './training-run-info-level/training-run-info-level.component';
import { TrainingRunGameLevelComponent } from './training-run-game-level/training-run-game-level.component';
import { TrainingRunAssessmentLevelComponent } from './training-run-assessment-level/training-run-assessment-level.component';
import {NgxMdModule} from "ngx-md";
import {FormsModule} from "@angular/forms";
import {RevealHintDialogComponent} from "./training-run-game-level/user-action-dialogs/reveal-hint-dialog/reveal-hint-dialog.component";
import { RevealSolutionDialogComponent } from './training-run-game-level/user-action-dialogs/reveal-solution-dialog/reveal-solution-dialog.component';
import { WrongFlagDialogComponent } from './training-run-game-level/user-action-dialogs/wrong-flag-dialog/wrong-flag-dialog.component';
 import {GraphModule} from "graph-topology";
import {CustomTopologyConfig} from "./training-run-game-level/graph-topology-config";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainingRunLevelMaterialModule,
    TrainingRunLevelRoutingModule,
    GraphModule.forRoot(new CustomTopologyConfig()),
    NgxMdModule.forRoot()
  ],
  declarations: [
    TrainingRunLevelComponent,
    TrainingRunInfoLevelComponent,
    TrainingRunGameLevelComponent,
    TrainingRunAssessmentLevelComponent,
    RevealHintDialogComponent,
    RevealSolutionDialogComponent,
    WrongFlagDialogComponent
  ],
  exports: [
    TrainingRunLevelComponent
  ],
  providers: [
  ],
  entryComponents: [
    RevealHintDialogComponent,
    RevealSolutionDialogComponent,
    WrongFlagDialogComponent
  ]
})

export class TrainingRunLevelModule {
}
