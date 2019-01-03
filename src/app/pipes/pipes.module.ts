import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";
import {DateTimeFormatPipe} from './date-time-format.pipe';

@NgModule({
  declarations: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe
  ],
  exports: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe
  ],
  providers: [
    LevelStepperLabelPipe,
    DateTimeFormatPipe
  ]
})

export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
