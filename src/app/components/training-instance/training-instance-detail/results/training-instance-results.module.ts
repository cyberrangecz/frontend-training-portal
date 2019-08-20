import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';
import {TrainingInstanceResultsRoutingModule} from './training-instance-results-routing.module';
import {TrainingInstanceResultsMaterialModule} from './training-instance-results-material.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingInstanceResultsRoutingModule,
    TrainingInstanceResultsMaterialModule
  ],
  declarations: [
  TrainingInstanceResultsComponent],
  providers: [
  ]
})
export class TrainingInstanceResultsModule {

}
