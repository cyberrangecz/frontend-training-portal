import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatCheckboxModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatStepperModule, MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class LevelConfigurationMaterialModule {}
