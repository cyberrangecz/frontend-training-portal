import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule
  ]
})

export class PortalMaterialModule {

}
