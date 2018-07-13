import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PortalComponent} from "./portal.component";
import {PortalRoutingModule} from "./portal-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule
  ],
  declarations: [
    PortalComponent
  ],
  providers: [

  ]
})

export class PortalModule {

}
