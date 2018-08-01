import {NgModule} from "@angular/core";
import {MatButtonModule, MatCardModule, MatIconModule, MatStepperModule} from "@angular/material";

@NgModule({
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class TrainingRunMaterialModule {}
