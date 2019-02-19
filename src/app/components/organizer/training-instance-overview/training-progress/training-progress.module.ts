import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingProgressComponent } from './training-progress.component';
import {TrainingProgressMaterialModule} from "./training-progress-material.module";
import {TrainingProgressRoutingModule} from "./training-progress-routing.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingProgressMaterialModule,
    TrainingProgressRoutingModule
  ],
  declarations: [
  TrainingProgressComponent
  ],
  providers: [
  ]
})

export class TrainingProgressModule {

}
