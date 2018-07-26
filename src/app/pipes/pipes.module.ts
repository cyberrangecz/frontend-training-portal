import {NgModule} from "@angular/core";
import {LevelStepperLabelPipe} from "./level-stepper-label.pipe";

@NgModule({
  declarations: [
    LevelStepperLabelPipe
  ],
  exports: [
    LevelStepperLabelPipe
  ],
  providers: [
    LevelStepperLabelPipe
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
