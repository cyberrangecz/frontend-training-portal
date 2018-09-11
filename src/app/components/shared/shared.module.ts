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
import {UploadDialogComponent} from "./upload-dialog/upload-dialog.component";
import {UploadService} from "../../services/data-setters/upload.service";
import {ngfModule} from "angular-file";
import { AlertSnackbarComponent } from './alert/alert-snackbar/alert-snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ngfModule,
    SharedMaterialModule
  ],
  declarations: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    NotAuthorizedComponent,
    UploadDialogComponent,
    AlertSnackbarComponent,
  ],
  exports: [
    NotFoundComponent,
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    NotAuthorizedComponent,
    UploadDialogComponent
  ],
  providers: [
    AlertService,
    UploadService
  ],
  entryComponents: [
    AlertSnackbarComponent
  ]
})

export class SharedModule {

}
