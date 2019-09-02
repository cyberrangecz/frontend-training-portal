import {Component, Inject, OnInit} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import {AlertEvent} from '../../../model/events/alert-event';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-alert-snackbar',
  templateUrl: './alert-snackbar.component.html',
  styleUrls: ['./alert-snackbar.component.css']
})
/** PRESENTATIONAL
 * Displays alert event in mtaerial snack bar
 */
export class AlertSnackbarComponent extends BaseComponent implements OnInit {

  messages: string[];

  constructor(
    public snackBarRef: MatSnackBarRef<AlertSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public alert: AlertEvent) {
    super();
  }

  ngOnInit() {
    this.messages = this.alert.payload.split('\n');
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}
