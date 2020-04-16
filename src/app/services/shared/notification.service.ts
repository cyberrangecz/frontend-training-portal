import { Injectable } from '@angular/core';
import { CsirtMuNotification, CsirtMuNotificationService, CsirtMuNotificationTypeEnum } from 'csirt-mu-layout';

/**
 * Global service emitting alert events.
 */
@Injectable()
export class NotificationService {
  constructor(private notificationService: CsirtMuNotificationService) {}

  /**
   * Adds new alert to the queue and if its the only element in queue calls method to display it.
   * @param type type of alert
   * @param {string} message alert to display to user
   * @param {number} duration how long should the alert be displayed.
   *  In millis, use 0 if it should be displayed until users clicks on button
   */
  emit(type: 'success' | 'error' | 'warning' | 'info', message: string, duration = 500) {
    const notification: CsirtMuNotification = {
      type: this.convertToCsirtNotificationType(type),
      duration,
      title: message,
    };
    this.notificationService.emit(notification);
  }

  private convertToCsirtNotificationType(type: 'success' | 'error' | 'warning' | 'info'): CsirtMuNotificationTypeEnum {
    switch (type) {
      case 'warning':
        return CsirtMuNotificationTypeEnum.Warning;
      case 'error':
        return CsirtMuNotificationTypeEnum.Error;
      case 'success':
        return CsirtMuNotificationTypeEnum.Success;
      default:
        return CsirtMuNotificationTypeEnum.Info;
    }
  }
}
