import {NgModule} from "@angular/core";
import {
  MatButtonModule,
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
    MatTooltipModule
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
    MatTooltipModule

  ]
})

export class DesignerMaterialModule {}
