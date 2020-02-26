import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {AlertService} from '../../services/shared/alert.service';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';
import {FreeFormComponent} from './free-form/free-form.component';
import {SharedMaterialModule} from './shared-material.module';

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
    FreeFormComponent
  ],
  exports: [
    FreeFormComponent
  ],
  providers: [
    AlertService,
    ErrorHandlerService,
  ]
})

export class SharedModule {

}
