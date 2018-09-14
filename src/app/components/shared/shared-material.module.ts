import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDividerModule,
  MatIconModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule,
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
    MatSnackBarModule
  ]
})

export class SharedMaterialModule {

}
