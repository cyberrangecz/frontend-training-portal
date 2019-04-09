import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {AuthorsTableFormatPipe} from "./authors-table-format.pipe";
import {CommonModule} from "@angular/common";
import {ShorterAuthorsFormatPipe} from './shorter-authors-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    AuthorsTableFormatPipe,
    ShorterAuthorsFormatPipe
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    AuthorsTableFormatPipe,
    ShorterAuthorsFormatPipe
  ]
})

export class PipesModule {
}
