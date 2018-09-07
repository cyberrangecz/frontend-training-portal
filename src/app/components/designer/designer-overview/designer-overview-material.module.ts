import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})

export class DesignerOverviewMaterialModule {}
