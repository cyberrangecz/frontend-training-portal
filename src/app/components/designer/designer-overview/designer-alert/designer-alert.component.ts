import {Component, OnDestroy, OnInit} from '@angular/core';
import {DesignerAlertMessageEvent} from "../../../../model/events/designer-alert-message-event";
import {DesignerAlertService} from "../../../../services/event-services/designer-alert.service";

@Component({
  selector: 'overview-designer-alert',
  templateUrl: './designer-alert.component.html',
  styleUrls: ['./designer-alert.component.css']
})
export class DesignerAlertComponent implements OnInit, OnDestroy {

  message: DesignerAlertMessageEvent = null;

  alertSubscription;

  constructor(private designerAlertService: DesignerAlertService) {
    this.subscribeAlert();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  dismissMessage() {
    this.message = null;
  }

  private subscribeAlert() {
    this.alertSubscription = this.designerAlertService.onAlertEventEmitted.subscribe(
      alert => {
        this.message = alert;
      }
    )
  }
}
