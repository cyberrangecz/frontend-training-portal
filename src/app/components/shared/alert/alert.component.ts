import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEvent} from "../../../model/events/alert-event";
import {AlertService} from "../../../services/event-services/alert.service";
import {MatSnackBar} from "@angular/material";
import {AlertSnackbarComponent} from "./alert-snackbar/alert-snackbar.component";
import {config} from "rxjs";

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
/**
 * Displays alert alert in form of Material card. Colour is derived from type of the alert and alert from alert event is displayed
 */
export class AlertComponent implements OnInit, OnDestroy {

  alertSubscription;

  constructor(public snackBar: MatSnackBar,
    private designerAlertService: AlertService) {
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
   * Subscribes to alert events and displays them
   */
  private subscribeAlert() {
    this.alertSubscription = this.designerAlertService.onAlertEventEmitted.subscribe(
      alert => {
        let snackBarRef = this.snackBar.openFromComponent(AlertSnackbarComponent, this.getConfig(alert));
      }
    )
  }

  /**
   * Creates config for AlertSnackbarComponent
   * @param alert received alert event
   */
  private getConfig(alert: AlertEvent) {
    return alert.duration <= 0 ? {data: alert} : {duration: alert.duration, data: alert};
  }
}
