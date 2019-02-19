import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { TrainingResultsComponent } from './training-results.component';
import {TrainingResultsRoutingModule} from "./training-results-routing.module";
import {TrainingResultsMaterialModule} from "./training-results-material.module";

@NgModule({
  imports: [
    CommonModule,
    TrainingResultsRoutingModule,
    TrainingResultsMaterialModule
  ],
  declarations: [
  TrainingResultsComponent],
  providers: [
  ]
})
export class TrainingResultsModule {

}
