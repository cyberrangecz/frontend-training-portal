import {DesignerAlertMessageEvent} from "../../model/events/designer-alert-message-event";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {DesignerAlertMessageEnum} from "../../enums/designer-alert-message.enum";

export class AlertService {

  private _onAlertEventEmittedSubject: Subject<DesignerAlertMessageEvent> = new Subject();
  onAlertEventEmitted: Observable<DesignerAlertMessageEvent> = this._onAlertEventEmittedSubject.asObservable();

  emitAlertMessage(alertType: DesignerAlertMessageEnum, message: string) {
    this._onAlertEventEmittedSubject.next(new DesignerAlertMessageEvent(alertType, message));
  }

}
