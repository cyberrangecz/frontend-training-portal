import { Injectable } from '@angular/core';
import {
  CsirtMuNotification,
  CsirtMuNotificationResult,
  CsirtMuNotificationService,
  CsirtMuNotificationTypeEnum,
} from 'csirt-mu-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Global service emitting alert events.
 */
@Injectable()
export class NotificationService {
  constructor(private layoutNotificationService: CsirtMuNotificationService) {}

  /**
   * Adds new alert to the queue and if its the only element in queue calls method to display it.
   * @param type type of alert
   * @param message alert to display to user
   * @param action name of the action button displayed in the notification
   * @param duration how long should the alert be displayed.
   *  In millis, use 0 if it should be displayed until users clicks on button
   *  Returns observable.
   *  Value of the observable is true if the provided action was selected, false otherwise (no reaction or dismissed)
   */
  emit(type: 'success' | 'error' | 'warning' | 'info', message: string, action?: string): Observable<boolean> {
    const notification: CsirtMuNotification = {
      type: this.convertToCsirtNotificationType(type),
      duration: 5000,
      title: message,
    };
    if (action !== undefined) {
      notification.action = action;
    }
    return this.layoutNotificationService
      .emit(notification)
      .pipe(map((result) => result === CsirtMuNotificationResult.CONFIRMED));
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
