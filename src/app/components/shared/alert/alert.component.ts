import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEvent} from "../../../model/events/alert-event";
import {AlertService} from "../../../services/event-services/alert.service";

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
/**
 * Displays alert message in form of Material card. Colour is derived from type of the alert and message from alert event is displayed
 */
export class AlertComponent implements OnInit, OnDestroy {

  message: AlertEvent = null;

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
    this.message = null;
  }

  /**
   * Subscribes to alert events and displays them
   */
  private subscribeAlert() {
    this.alertSubscription = this.designerAlertService.onAlertEventEmitted.subscribe(
      alert => {
        this.message = alert;
      }
    )
  }
}
