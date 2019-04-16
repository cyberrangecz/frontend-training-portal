import {NgModule} from "@angular/core";
import {
  MatBadgeModule,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDividerModule,
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
    MatTooltipModule
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
    MatTooltipModule
  ]
})

export class SharedMaterialModule {

}
