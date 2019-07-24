import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {CommonModule} from "@angular/common";
import {ShorterAuthorsFormatPipe} from './shorter-authors-format.pipe';
import {TrainingDefinitionsTableFormatPipe} from './shorter-training-definitions-format.pipe';
import {ShortStringPipe} from "./short-string.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    TrainingDefinitionsTableFormatPipe,
    ShortStringPipe
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    TrainingDefinitionsTableFormatPipe,
    ShortStringPipe
  ]
})

export class PipesModule {
}
