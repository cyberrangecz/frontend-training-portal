import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatStepperModule
} from "@angular/material";

@NgModule({
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class TrainingRunMaterialModule {}
