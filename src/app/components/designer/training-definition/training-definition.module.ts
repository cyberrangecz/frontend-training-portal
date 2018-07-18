import {NgModule} from "@angular/core";
import { TrainingDefinitionComponent } from './training-definition.component';
import {CommonModule} from "@angular/common";
import {TrainingDefinitionMaterialModule} from "./training-definition-material.module";
import {TrainingDefinitionRoutingModule} from "./training-definition-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingDefinitionRoutingModule,
    TrainingDefinitionMaterialModule
  ],
  declarations: [
    TrainingDefinitionComponent
  ],
  providers: [

  ]
})

export class TrainingDefinitionModule {

}
