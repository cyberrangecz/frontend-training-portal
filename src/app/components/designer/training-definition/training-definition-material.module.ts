import {NgModule} from "@angular/core";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})

export class TrainingDefinitionMaterialModule {}
