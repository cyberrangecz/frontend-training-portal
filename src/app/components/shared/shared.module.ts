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
import {ErrorHandlerService} from "../../services/error-handler.service";
import { SandboxAllocationWindowComponent } from './sandbox-allocation/sandbox-allocation-window.component';
import {SandboxAllocationService} from "../../services/sandbox-allocation/sandbox-allocation.service";
import {TrainingInstanceFacadeModule} from '../../services/facades/modules/training-instance-facade.module';
import { SandboxAllocationPanelComponent } from './sandbox-allocation/sandbox-allocation-panel/sandbox-allocation-panel.component';
import { SandboxAllocationContentMinimizedComponent } from './sandbox-allocation/sandbox-allocation-content-minimized/sandbox-allocation-content-minimized.component';
import {InstanceAllocationObservablesPoolService} from "../../services/sandbox-allocation/instance-allocation-observables-pool.service";
import {SandboxInstanceFacadeModule} from "../../services/facades/modules/sandbox-instance-facade.module";
import {SandboxAllocationContentMaximizedComponent} from './sandbox-allocation/sandbox-allocation-content-maximized/sandbox-allocation-content-maximized.component';
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule,
    SandboxInstanceFacadeModule
  ],
  declarations: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    AlertSnackbarComponent,
    DeleteDialogComponent,
    SandboxAllocationWindowComponent,
    SandboxAllocationPanelComponent,
    SandboxAllocationContentMinimizedComponent,
    SandboxAllocationContentMaximizedComponent,
  ],
  exports: [
    ToolbarComponent,
    UserMenuComponent,
    SidenavComponent,
    AlertComponent,
    SharedMaterialModule,
    DeleteDialogComponent,
    SandboxAllocationWindowComponent
  ],
  providers: [
    AlertService,
    ErrorHandlerService,
    UploadService,
    TrainingInstanceFacadeModule,
    InstanceAllocationObservablesPoolService,
    SandboxAllocationService,
  ],
  entryComponents: [
    AlertSnackbarComponent,
    DeleteDialogComponent
  ]
})

export class SharedModule {

}
