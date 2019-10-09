import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {LevelStepperLabelPipe} from './level-stepper-label.pipe';
import {ShortStringPipe} from './short-string.pipe';
import {ShorterAuthorsFormatPipe} from './shorter-authors-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    ShortStringPipe,
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    ShortStringPipe,
  ]
})

export class PipesModule {
}
