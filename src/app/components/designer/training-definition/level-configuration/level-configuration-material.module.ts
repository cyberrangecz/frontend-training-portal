import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatStepperModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatStepperModule
  ]
})
export class LevelConfigurationMaterialModule {}
