import {NgModule} from '@angular/core';
import {SharedMaterialModule} from './shared-material.module';
import {CommonModule} from '@angular/common';
import {AlertService} from '../../services/shared/alert.service';
import {FormsModule} from '@angular/forms';
import { AlertSnackbarComponent } from './alert/alert-snackbar/alert-snackbar.component';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {ActionConfirmationDialog} from './delete-dialog/action-confirmation-dialog.component';
import { UserSelectionTableComponent } from './user-selection-table/user-selection-table.component';
import {UnsavedChangesDialogComponent} from './unsaved-changes-dialog/unsaved-changes-dialog.component';

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
    UnsavedChangesDialogComponent

  ],
  exports: [
    ActionConfirmationDialog,
    UserSelectionTableComponent,
    UnsavedChangesDialogComponent
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
