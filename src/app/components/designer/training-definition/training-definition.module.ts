import {NgModule} from "@angular/core";
import { TrainingDefinitionComponent } from './training-definition.component';
import {CommonModule} from "@angular/common";
import {TrainingDefinitionMaterialModule} from "./training-definition-material.module";
import {TrainingDefinitionRoutingModule} from "./training-definition-routing.module";
import { TrainingConfigurationComponent } from './training-configuration/training-configuration.component';
import { TrainingLevelStepperComponent } from './training-level-stepper/training-level-stepper.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import { AuthorsPickerComponent } from './training-configuration/authors-picker/authors-picker.component';
import { SandboxDefinitionPickerComponent } from './training-configuration/sandbox-definition-picker/sandbox-definition-picker.component';
import {LevelGetterService} from "../../../services/data-getters/level-getter.service";
import {LevelConfigurationModule} from "./level-configuration/level-configuration.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TrainingDefinitionRoutingModule,
    TrainingDefinitionMaterialModule,
    LevelConfigurationModule
  ],
  declarations: [
    TrainingDefinitionComponent,
    TrainingConfigurationComponent,
    TrainingLevelStepperComponent,
    AuthorsPickerComponent,
    SandboxDefinitionPickerComponent
  ],
  providers: [
    LevelGetterService
  ],
  entryComponents: [
    SandboxDefinitionPickerComponent,
    AuthorsPickerComponent
  ]
})

export class TrainingDefinitionModule {

}
