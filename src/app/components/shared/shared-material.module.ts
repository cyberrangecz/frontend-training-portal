import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule
  ]
})

export class SharedMaterialModule {

}
