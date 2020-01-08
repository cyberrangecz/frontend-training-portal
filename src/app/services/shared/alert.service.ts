import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import Queue from 'typescript-collections/dist/lib/Queue';
import {environment} from '../../../environments/environment';
import {AlertSnackbarComponent} from '../../components/shared/alert/alert-snackbar.component';
import {AlertTypeEnum} from '../../model/enums/alert-type.enum';
import {AlertEvent} from '../../model/events/alert-event';

/**
 * Global service emitting alert events.
 */
@Injectable()
export class AlertService {

  private alertQueue: Queue<AlertEvent> = new Queue();

  constructor(public snackBar: MatSnackBar) {
  }

  /**
   * Adds new alert to the queue and if its the only element in queue calls method to display it.
   * @param {AlertTypeEnum} alertType type of alert
   * @param {string} message alert to display to user
   * @param {number} duration how long should the alert be displayed.
   *  In millis, use 0 if it should be displayed until users clicks on button
   */
  emitAlert(alertType: AlertTypeEnum | string, message: string, duration = environment.defaultAlertDuration) {
    let alert: AlertTypeEnum;
    if (typeof alertType === 'string') {
      alert = this.convertToEnum(alertType);
    } else {
      alert = alertType;
    }
    this.alertQueue.enqueue(new AlertEvent(alert, message, duration));
    if (this.alertQueue.size() === 1) {
      this.displayAlertComponent();
    }
  }

  private convertToEnum(alertType: string): AlertTypeEnum {
    switch (alertType.toLowerCase()) {
      case 'warning': return AlertTypeEnum.Warning;
      case 'error': return AlertTypeEnum.Error;
      case 'success': return AlertTypeEnum.Success;
      default: return AlertTypeEnum.Info;
    }
  }

  /**
   * Displays alert component and binds to its subscription to remove the alert from queue on dismiss
   */
  private displayAlertComponent() {
    const snackBarRef = this.snackBar.openFromComponent(AlertSnackbarComponent,
      this.getConfig(this.alertQueue.peek()));

    snackBarRef.afterDismissed().subscribe(() => {
      this.alertQueue.dequeue();
      if (!this.alertQueue.isEmpty()) {
        this.displayAlertComponent();
      }
    });
  }

  /**
   * Creates config for AlertSnackbarComponent
   * @param alert received alert event
   */
  private getConfig(alert: AlertEvent) {
    return alert.duration < 0 ? {data: alert} : {duration: alert.duration, data: alert};
  }

}
