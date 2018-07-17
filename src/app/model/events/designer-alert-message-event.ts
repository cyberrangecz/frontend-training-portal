import {DesignerAlertMessageEnum} from "../../enums/designer-alert-message.enum";

export class DesignerAlertMessageEvent {
  type: DesignerAlertMessageEnum;
  payload: string;


  constructor(type: DesignerAlertMessageEnum, payload: string) {
    this.type = type;
    this.payload = payload;
  }
}
