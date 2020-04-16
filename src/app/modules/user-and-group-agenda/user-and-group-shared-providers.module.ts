import { NgModule } from '@angular/core';
import { UserAndGroupErrorHandler, UserAndGroupNotificationService } from 'kypo2-user-and-group-management';
import { ErrorHandlerService } from '../../services/shared/error-handler.service';
import { NotificationService } from '../../services/shared/notification.service';

@NgModule({
  providers: [
    { provide: UserAndGroupErrorHandler, useClass: ErrorHandlerService },
    { provide: UserAndGroupNotificationService, useClass: NotificationService },
  ],
})
export class UserAndGroupSharedProvidersModule {}
