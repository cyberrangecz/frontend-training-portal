import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDividerModule,
  MatIconModule,
  MatMenuModule, MatProgressBarModule,
  MatSidenavModule,
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
    MatProgressBarModule
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
    MatProgressBarModule
  ]
})

export class SharedMaterialModule {

}
