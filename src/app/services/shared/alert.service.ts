import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {CsirtMuNotification, CsirtMuNotificationService, CsirtMuNotificationTypeEnum} from 'csirt-mu-layout';

/**
 * Global service emitting alert events.
 */
@Injectable()
export class AlertService {

  constructor(private notificationService: CsirtMuNotificationService) {
  }

  /**
   * Adds new alert to the queue and if its the only element in queue calls method to display it.
   * @param {AlertTypeEnum} alertType type of alert
   * @param {string} message alert to display to user
   * @param {number} duration how long should the alert be displayed.
   *  In millis, use 0 if it should be displayed until users clicks on button
   */
  emitAlert(alertType: AlertTypeEnum, message: string, duration = environment.defaultAlertDuration) {
    const notification: CsirtMuNotification = {
      type: this.convertToNotificationType(alertType),
      duration: duration,
      title: message
    };
    this.notificationService.emit(notification);
  }

  private convertToNotificationType(alertType: AlertTypeEnum): CsirtMuNotificationTypeEnum {
    switch (alertType) {
      case AlertTypeEnum.Warning: return CsirtMuNotificationTypeEnum.Warning;
      case AlertTypeEnum.Error: return CsirtMuNotificationTypeEnum.Error;
      case AlertTypeEnum.Success: return CsirtMuNotificationTypeEnum.Success;
      default: return CsirtMuNotificationTypeEnum.Info;
    }
  }
}
