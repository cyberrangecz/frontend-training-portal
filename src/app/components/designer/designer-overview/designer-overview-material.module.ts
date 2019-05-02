import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';

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
    MatProgressSpinnerModule,
    MatListModule,
    MatSelectModule
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule
  ]
})

export class DesignerOverviewMaterialModule {}
