import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatOptionModule, MatPaginatorModule,
  MatSelectModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";



@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatOptionModule,
    MatPaginatorModule
  ]
})

export class OrganizerOverviewMaterialModule {

}
