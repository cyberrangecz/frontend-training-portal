import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatExpansionModule,
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
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule,
    MatTooltipModule
  ]
})
export class LevelConfigurationMaterialModule {}
