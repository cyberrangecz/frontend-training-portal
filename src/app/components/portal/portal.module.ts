import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PortalComponent} from "./portal.component";
import {PortalRoutingModule} from "./portal-routing.module";
import {PortalMaterialModule} from "./portal-material.module";

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    PortalMaterialModule
  ],
  declarations: [
    PortalComponent
  ],
  providers: [

  ]
})

export class PortalModule {

}
