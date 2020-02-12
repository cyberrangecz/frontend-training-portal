import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {AlertService} from '../../services/shared/alert.service';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {ActionConfirmationDialogComponent} from './action-confirmation-dialog/action-confirmation-dialog.component';
import {AlertSnackbarComponent} from './alert/alert-snackbar.component';
import {FreeFormComponent} from './free-form/free-form.component';
import {SharedMaterialModule} from './shared-material.module';
import {UnsavedChangesDialogComponent} from './unsaved-changes-dialog/unsaved-changes-dialog.component';

/**
 * Module wrapping collection of services and components shared across the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  declarations: [
    AlertSnackbarComponent,
    ActionConfirmationDialogComponent,
    UnsavedChangesDialogComponent,
    FreeFormComponent
  ],
  exports: [
    ActionConfirmationDialogComponent,
    UnsavedChangesDialogComponent,
    FreeFormComponent
  ],
  providers: [
    AlertService,
    ErrorHandlerService,
  ]
})

export class SharedModule {

}
