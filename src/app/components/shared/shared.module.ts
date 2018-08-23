import {NgModule} from "@angular/core";
import {SharedMaterialModule} from "./shared-material.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {UserMenuComponent} from "./toolbar/user-menu/user-menu.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AlertComponent} from "./alert/alert.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AlertService} from "../../services/event-services/alert.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule
  ],
  exports: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    NotAuthorizedComponent,
  ],
  providers: [
    AlertService
  ]
})

export class SharedModule {

}
