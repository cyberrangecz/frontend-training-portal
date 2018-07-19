import {AlertEvent} from "../../model/events/alert-event";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {AlertTypeEnum} from "../../enums/alert-type.enum";

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
   * @param {string} message message to display to user
   */
  emitAlert(alertType: AlertTypeEnum, message: string) {
    this._onAlertEventEmittedSubject.next(new AlertEvent(alertType, message));
  }

}
