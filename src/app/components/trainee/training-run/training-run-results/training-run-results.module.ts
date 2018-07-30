import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TrainingRunResultsMaterialModule} from "./training-run-results-material.module";
import {TrainingRunResultsRoutingModule} from "./training-run-results-routing.module";
import { TrainingRunResultsComponent } from './training-run-results.component';

@NgModule({
  imports: [
    CommonModule,
    TrainingRunResultsMaterialModule,
    TrainingRunResultsRoutingModule
  ],
  declarations: [TrainingRunResultsComponent],
  providers: []
})
export class TrainingRunResultsModule {

}
