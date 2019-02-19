import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})

export class TrainingSummaryMaterialModule {

}
