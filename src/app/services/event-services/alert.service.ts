import {AlertEvent} from "../../model/events/alert-event";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AlertTypeEnum} from "../../enums/alert-type.enum";
import {environment} from "../../../environments/environment";

/**
 * Service for emitting and subscribing to alert events. Usually used to display result of some user action.
 */
export class AlertService {

  private _onAlertEventEmittedSubject: Subject<AlertEvent> = new Subject();
  /**
   * Observable emitting alert events
   * @type {Observable<AlertEvent>} Observable of alert event
   */
  onAlertEventEmitted: Observable<AlertEvent> = this._onAlertEventEmittedSubject.asObservable();

  /**
   * Emits new alert
   * @param {AlertTypeEnum} alertType type of alert
   * @param {string} message alert to display to user
   * @param {number} duration how long should the alert be displayed. In millis, use 0 if it should be displayed until users clicks on button
   */
  emitAlert(alertType: AlertTypeEnum, message: string, duration = environment.defaultAlertDuration) {
    this._onAlertEventEmittedSubject.next(new AlertEvent(alertType, message, duration));
  }

}
