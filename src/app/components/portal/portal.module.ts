import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PortalComponent} from "./portal.component";
import {PortalRoutingModule} from "./portal-routing.module";
import {PortalMaterialModule} from "./portal-material.module";
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { UserMenuComponent } from '../shared/toolbar/user-menu/user-menu.component';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { PortalContentComponent } from './content/portal-content.component';

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
