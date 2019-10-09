import {AlertTypeEnum} from '../enums/alert-type.enum';

/**
 * Class representing an alert event. Type is used to determines meaning of the alert (success, warning, etc) and
 * payload is a alert to show to an user.
 */
export class AlertEvent {
  type: AlertTypeEnum;
  payload: string;
  duration: number;

  constructor(type: AlertTypeEnum, payload: string, duration: number) {
    this.type = type;
    this.duration = duration;
    this.payload = payload;
  }
}
