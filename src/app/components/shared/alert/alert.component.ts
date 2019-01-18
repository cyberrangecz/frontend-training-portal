import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertEvent} from "../../../model/events/alert-event";
import {AlertService} from "../../../services/event-services/alert.service";
import {MatSnackBar, MatSnackBarRef} from '@angular/material';
import {AlertSnackbarComponent} from "./alert-snackbar/alert-snackbar.component";
import {config} from "rxjs";
import Queue from 'typescript-collections/dist/lib/Queue';

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
/**
 * Displays alert alert in form of Material card. Colour is derived from type of the alert and alert from alert event is displayed
 */
export class AlertComponent implements OnInit {

  ngOnInit() {
  }
}
