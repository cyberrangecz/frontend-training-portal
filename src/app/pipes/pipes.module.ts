import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {AuthorsTableFormatPipe} from "./authors-table-format.pipe";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    AuthorsTableFormatPipe
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    AuthorsTableFormatPipe
  ]
})

export class PipesModule {
}
