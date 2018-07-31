import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatStepperModule} from "@angular/material";

@NgModule({
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TrainingRunMaterialModule {}
