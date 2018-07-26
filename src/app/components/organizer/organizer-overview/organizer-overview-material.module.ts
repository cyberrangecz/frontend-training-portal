import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule, MatOptionModule,
  MatSelectModule,
  MatTableModule, MatTooltipModule
} from "@angular/material";

import { MatDatetimepickerModule } from "@mat-datetimepicker/core";


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
    MatDatepickerModule,
    MatNativeDateModule
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
    MatDatepickerModule,
    MatNativeDateModule
  ]
})

export class OrganizerOverviewMaterialModule {

}
