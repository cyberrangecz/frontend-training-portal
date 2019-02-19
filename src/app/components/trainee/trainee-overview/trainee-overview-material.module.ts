import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ]
})
export class TraineeOverviewMaterialModule {

}
