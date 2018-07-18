import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorModule,
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
    MatDialogModule
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
    MatDialogModule
  ]
})

export class DesignerOverviewMaterialModule {}
