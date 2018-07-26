import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { GameLevelConfigurationComponent } from './game-level-configuration/game-level-configuration.component';
import {LevelConfigurationMaterialModule} from "./level-configuration-material.module";
import { InfoLevelConfigurationComponent } from './info-level-configuration/info-level-configuration.component';
import { AssessmentLevelConfigurationComponent } from './assessment-level-configuration/assessment-level-configuration.component';
import { LevelConfigurationComponent } from './level-configuration.component';
import {SharedModule} from "../../../shared/shared.module";
import { HintStepperComponent } from './hints/hint-stepper/hint-stepper.component';
import { HintConfigurationComponent } from './hints/hint-configuration/hint-configuration.component';
import { QuestionStepperComponent } from './questions/question-stepper/question-stepper.component';
import { QuestionConfigurationComponent } from './questions/question-configuration/question-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LevelConfigurationMaterialModule,
    SharedModule,
  ],
  exports: [
    LevelConfigurationComponent
  ],
  declarations: [
  GameLevelConfigurationComponent,
  InfoLevelConfigurationComponent,
  AssessmentLevelConfigurationComponent,
  LevelConfigurationComponent,
  HintStepperComponent,
  HintConfigurationComponent,
  QuestionStepperComponent,
  QuestionConfigurationComponent
  ],
  providers: [
  ]
})

export class LevelConfigurationModule {

}
