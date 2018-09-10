import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material";
import {AlertEvent} from "../../../../model/events/alert-event";

@Component({
  selector: 'app-alert-snackbar',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.css']
})
export class AlertSnackbarComponent implements OnInit {

  messages: string[];

  constructor(
    public snackBarRef: MatSnackBarRef<AlertSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public alert: AlertEvent) { }

  ngOnInit() {
    this.messages = this.alert.payload.split('\n');
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
