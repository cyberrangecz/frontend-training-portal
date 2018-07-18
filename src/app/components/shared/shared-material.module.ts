import {NgModule} from "@angular/core";
import {
  MatButtonModule,
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
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})

export class SharedMaterialModule {

}
