import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEvent} from "../../../model/events/alert-event";
import {AlertService} from "../../../services/event-services/alert.service";

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
/**
 * Displays alert alert in form of Material card. Colour is derived from type of the alert and alert from alert event is displayed
 */
export class AlertComponent implements OnInit, OnDestroy {

  alert: AlertEvent = null;
  messages: string[];

  alertSubscription;

  constructor(private designerAlertService: AlertService) {
    this.subscribeAlert();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  /**
   * Deletes current alert
   */
  dismissAlert() {
    this.alert = null;
  }

  /**
   * Subscribes to alert events and displays them
   */
  private subscribeAlert() {
    this.alertSubscription = this.designerAlertService.onAlertEventEmitted.subscribe(
      alert => {
        this.alert = alert;
        this.messages = alert.payload.split('\n');
      }
    )
  }
}
