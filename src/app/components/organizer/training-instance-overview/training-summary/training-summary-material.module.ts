import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule} from "@angular/material";

@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class TrainingSummaryMaterialModule {

}
