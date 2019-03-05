import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatRadioModule,
  MatSelectModule, MatSidenavModule, MatStepperModule, MatTooltipModule
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
    MatTooltipModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatRadioModule
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
    MatTooltipModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatRadioModule
  ]
})

export class TrainingDefinitionMaterialModule {}
