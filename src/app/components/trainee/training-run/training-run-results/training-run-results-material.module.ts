import {NgModule} from "@angular/core";
import {MatButtonModule, MatProgressSpinnerModule} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class TrainingRunResultsMaterialModule {}
