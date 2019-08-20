import {NgModule} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class TrainingInstanceResultsMaterialModule {

}
