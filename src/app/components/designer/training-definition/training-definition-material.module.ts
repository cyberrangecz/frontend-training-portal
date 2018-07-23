import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatSelectModule, MatStepperModule
} from "@angular/material";

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
    MatMenuModule,
    MatDividerModule
  ]
})

export class TrainingDefinitionMaterialModule {}
