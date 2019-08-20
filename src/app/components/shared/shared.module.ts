import {NgModule} from "@angular/core";
import {SharedMaterialModule} from "./shared-material.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SidenavComponent} from "../layout/sidenav/sidenav.component";
import {UserMenuComponent} from "../layout/user-menu/user-menu.component";
import {ToolbarComponent} from "../layout/toolbar/toolbar.component";
import {AlertService} from "../../services/shared/alert.service";
import {FormsModule} from "@angular/forms";
import {UploadService} from "../../services/shared/upload.service";
import { AlertSnackbarComponent } from './alert/alert-snackbar/alert-snackbar.component';
import {ErrorHandlerService} from "../../services/shared/error-handler.service";
import {SandboxAllocationService} from "../../services/training-instance/sandbox-allocation/sandbox-allocation.service";
import {TrainingInstanceFacadeModule} from '../../services/facades/modules/training-instance-facade.module';
import {SandboxInstanceObservablesPoolService} from "../../services/training-instance/sandbox-allocation/sandbox-instance-observables-pool.service";
import {SandboxInstanceFacadeModule} from "../../services/facades/modules/sandbox-instance-facade.module";
import {ActionConfirmationDialog} from "./delete-dialog/action-confirmation-dialog.component";
import { UserSelectionTableComponent } from './user-selection-table/user-selection-table.component';
import { UserIdComponent } from './user-id/user-id.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
  ],
  declarations: [
    AlertSnackbarComponent,
    ActionConfirmationDialog,
    UserSelectionTableComponent,

  ],
  exports: [
    ActionConfirmationDialog,
    UserSelectionTableComponent,
  ],
  providers: [
    AlertService,
    ErrorHandlerService,
  ],
  entryComponents: [
    AlertSnackbarComponent,
    ActionConfirmationDialog,
  ]
})

export class SharedModule {

}
