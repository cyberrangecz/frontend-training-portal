import {NgModule} from "@angular/core";
import {SharedMaterialModule} from "./shared-material.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {UserMenuComponent} from "./toolbar/user-menu/user-menu.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";

@NgModule({
  declarations: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent
  ]
})

export class SharedModule {

}
