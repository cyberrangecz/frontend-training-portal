import {NgModule} from '@angular/core';
import {SandboxErrorHandler, SandboxNotificationService} from 'kypo-sandbox-agenda';
import {NotificationService} from '../../services/shared/notification.service';
import {ErrorHandlerService} from '../../services/shared/error-handler.service';

@NgModule({
  providers: [
    {provide: SandboxErrorHandler, useClass: ErrorHandlerService},
    {provide: SandboxNotificationService, useClass: NotificationService}
  ]
})
export class SharedProvidersModule {
}
