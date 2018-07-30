import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";

@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})

export class TrainingSummaryMaterialModule {

}
