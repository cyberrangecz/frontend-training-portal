import {NgModule} from "@angular/core";
import { TrainingDefinitionComponent } from './training-definition.component';
import {CommonModule} from "@angular/common";
import {TrainingDefinitionMaterialModule} from "./training-definition-material.module";
import {TrainingDefinitionRoutingModule} from "./training-definition-routing.module";
import { TrainingConfigurationComponent } from './training-configuration/training-configuration.component';
import { TrainingLevelStepperComponent } from './training-level-stepper/training-level-stepper.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TrainingDefinitionRoutingModule,
    TrainingDefinitionMaterialModule
  ],
  declarations: [
    TrainingDefinitionComponent,
    TrainingConfigurationComponent,
    TrainingLevelStepperComponent
  ],
  providers: [

  ]
})

export class TrainingDefinitionModule {

}
