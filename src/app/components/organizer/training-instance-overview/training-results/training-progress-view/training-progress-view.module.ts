import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingProgressViewComponent } from './training-progress-view.component';
import {TrainingProgressViewRoutingModule} from "./training-progress-view-routing.module";
import {TrainingProgressViewMaterialModule} from "./training-progress-view-material.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingProgressViewRoutingModule,
    TrainingProgressViewMaterialModule
  ],
  declarations: [
  TrainingProgressViewComponent
  ],
  providers: [
  ]
})

export class TrainingProgressViewModule {

}
