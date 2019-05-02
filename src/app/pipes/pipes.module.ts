import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {CommonModule} from "@angular/common";
import {ShorterAuthorsFormatPipe} from './shorter-authors-format.pipe';
import {TrainingDefinitionsTableFormatPipe} from './shorter-training-definitions-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    TrainingDefinitionsTableFormatPipe
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe,
    ShorterAuthorsFormatPipe,
    TrainingDefinitionsTableFormatPipe
  ]
})

export class PipesModule {
}
