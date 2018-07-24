import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class LevelConfigurationMaterialModule {}
