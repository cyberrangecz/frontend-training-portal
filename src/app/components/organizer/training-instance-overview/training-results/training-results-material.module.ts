import {NgModule} from "@angular/core";
import {MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule} from "@angular/material";

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
export class TrainingResultsMaterialModule {

}
