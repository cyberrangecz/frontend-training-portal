import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TrainingInstanceResultsMaterialModule} from './training-instance-results-material.module';
import {TrainingInstanceResultsRoutingModule} from './training-instance-results-routing.module';
import { TrainingInstanceResultsComponent } from './training-instance-results.component';

/**
 * Module containing components and routing for training instance results (mainly visualuzations)
 */
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
