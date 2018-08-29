import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatRadioModule,
  MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule
  ]
})
export class TrainingRunLevelMaterialModule {

}
