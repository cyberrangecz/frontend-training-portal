import {NgModule} from "@angular/core";
import {SharedMaterialModule} from "./shared-material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {UserMenuComponent} from "./toolbar/user-menu/user-menu.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AlertComponent} from "./alert/alert.component";
import {AlertService} from "../../services/event-services/alert.service";
import {FormsModule} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import { AlertSnackbarComponent } from './alert/alert-snackbar/alert-snackbar.component';
import {ComponentErrorHandlerService} from "../../services/component-error-handler.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule
  ],
  declarations: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    AlertSnackbarComponent,
  ],
  exports: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    SharedMaterialModule
  ],
  providers: [
    AlertService,
    ComponentErrorHandlerService,
    UploadService
  ],
  entryComponents: [
    AlertSnackbarComponent
  ]
})

export class SharedModule {

}
