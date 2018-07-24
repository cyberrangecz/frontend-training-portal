import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { GameLevelConfigurationComponent } from './game-level-configuration/game-level-configuration.component';
import {LevelConfigurationMaterialModule} from "./level-configuration-material.module";
import { InfoLevelConfigurationComponent } from './info-level-configuration/info-level-configuration.component';
import { AssessmentLevelConfigurationComponent } from './assessment-level-configuration/assessment-level-configuration.component';
import { LevelConfigurationComponent } from './level-configuration.component';
import {LevelService} from "../../../../services/level.service";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LevelConfigurationMaterialModule,
    SharedModule
  ],
  exports: [
    LevelConfigurationComponent
  ],
  declarations: [
  GameLevelConfigurationComponent,
  InfoLevelConfigurationComponent,
  AssessmentLevelConfigurationComponent,
  LevelConfigurationComponent
  ],
  providers: [
    LevelService
  ]
})

export class LevelConfigurationModule {

}
