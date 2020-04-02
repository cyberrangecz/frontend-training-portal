import {NgModule} from '@angular/core';
import {SandboxErrorHandler, SandboxNotificationService} from 'kypo-sandbox-agenda';
import {AlertService} from '../../services/shared/alert.service';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';

@NgModule({
  providers: [
    {provide: SandboxErrorHandler, useClass: ErrorHandlerService},
    {provide: SandboxNotificationService, useClass: AlertService}
  ]
})
export class SharedProvidersModule {
}
