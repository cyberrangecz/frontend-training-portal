import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PortalComponent} from "./portal.component";
import {PortalRoutingModule} from "./portal-routing.module";
import {PortalMaterialModule} from "./portal-material.module";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    PortalMaterialModule
  ],
  declarations: [
    PortalComponent,
    ToolbarComponent,
    UserMenuComponent
  ],
  providers: [

  ]
})

export class PortalModule {

}
