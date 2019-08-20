import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {UserMenuComponent} from "./user-menu/user-menu.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {FormsModule} from "@angular/forms";
import {LayoutMaterialModule} from "./layout-material.module";
import {MatSidenavModule} from "@angular/material";
import {UserIdModule} from "../shared/user-id.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutMaterialModule,
    UserIdModule
  ],
  declarations: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
  ],
  exports: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    MatSidenavModule
  ],
})

export class LayoutModule {

}
