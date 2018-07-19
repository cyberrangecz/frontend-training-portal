import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEvent} from "../../../model/events/alert-event";
import {AlertService} from "../../../services/event-services/alert.service";

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
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
