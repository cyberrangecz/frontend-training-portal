import {AlertTypeEnum} from "../../enums/alert-type.enum";

export class AlertEvent {
  type: AlertTypeEnum;
  payload: string;


  constructor(type: AlertTypeEnum, payload: string) {
    this.type = type;
    this.payload = payload;
  }
}
