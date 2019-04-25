import {NgModule} from "@angular/core";
import {
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule, MatTooltipModule,
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule
  ]
})

export class SharedMaterialModule {

}
