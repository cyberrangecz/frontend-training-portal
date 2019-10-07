import {NgModule} from '@angular/core';
import {SharedMaterialModule} from './shared-material.module';
import {CommonModule} from '@angular/common';
import {AlertService} from '../../services/shared/alert.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertSnackbarComponent } from './alert/alert-snackbar.component';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {ActionConfirmationDialogComponent} from './action-confirmation-dialog/action-confirmation-dialog.component';
import {UnsavedChangesDialogComponent} from './unsaved-changes-dialog/unsaved-changes-dialog.component';
import {MatDividerModule} from '@angular/material';
import {FreeFormComponent} from './free-form/free-form.component';

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
  ],
  entryComponents: [
    AlertSnackbarComponent,
    ActionConfirmationDialogComponent,
  ]
})

export class SharedModule {

}
