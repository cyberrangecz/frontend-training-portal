import {NgModule} from '@angular/core';
import {SharedMaterialModule} from './shared-material.module';
import {CommonModule} from '@angular/common';
import {AlertService} from '../../services/shared/alert.service';
import {FormsModule} from '@angular/forms';
import { AlertSnackbarComponent } from './alert/alert-snackbar.component';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {ActionConfirmationDialogComponent} from './action-confirmation-dialog/action-confirmation-dialog.component';
import {UnsavedChangesDialogComponent} from './unsaved-changes-dialog/unsaved-changes-dialog.component';

/**
 * Module wrapping collection of services and components shared across the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
  ],
  declarations: [
    AlertSnackbarComponent,
    ActionConfirmationDialogComponent,
    UnsavedChangesDialogComponent,
  ],
  exports: [
    ActionConfirmationDialogComponent,
    UnsavedChangesDialogComponent
  ],
  providers: [
    AlertService,
    ErrorHandlerService,
  ],
  entryComponents: [
    AlertSnackbarComponent,
    ActionConfirmationDialogComponent,
  ]
})

export class SharedModule {

}
