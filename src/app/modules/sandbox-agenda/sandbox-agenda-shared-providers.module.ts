import { NgModule } from '@angular/core';
import { SandboxErrorHandler, SandboxNotificationService } from 'kypo-sandbox-agenda';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { NotificationService } from '../../services/shared/notification.service';

@NgModule({
  providers: [
    { provide: SandboxErrorHandler, useClass: ErrorHandlerService },
    { provide: SandboxNotificationService, useClass: NotificationService },
  ],
})
export class SandboxAgendaSharedProvidersModule {}
