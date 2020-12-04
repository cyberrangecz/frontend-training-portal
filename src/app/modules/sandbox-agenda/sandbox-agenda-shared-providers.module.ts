import { NgModule } from '@angular/core';
import { SandboxErrorHandler, SandboxNotificationService } from '@muni-kypo-crp/sandbox-agenda';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { NotificationService } from '../../services/shared/notification.service';

@NgModule({
  providers: [
    { provide: SandboxErrorHandler, useClass: ErrorHandlerService },
    { provide: SandboxNotificationService, useClass: NotificationService },
  ],
})
export class SandboxAgendaSharedProvidersModule {}
