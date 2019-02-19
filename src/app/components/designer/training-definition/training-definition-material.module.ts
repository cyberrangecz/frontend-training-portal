import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
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
    MatSidenavModule
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
    MatSidenavModule
  ]
})

export class TrainingDefinitionMaterialModule {}
