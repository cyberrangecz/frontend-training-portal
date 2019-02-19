import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule, MatSortModule,
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
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
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
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})

export class OrganizerOverviewMaterialModule {

}
