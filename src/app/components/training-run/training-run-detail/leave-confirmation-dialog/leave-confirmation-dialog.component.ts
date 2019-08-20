import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {BaseComponent} from "../../../base.component";

@Component({
  selector: 'app-leave-confirmation-modal',
  templateUrl: './leave-confirmation-dialog.component.html',
  styleUrls: ['./leave-confirmation-dialog.component.css']
})
export class LeaveConfirmationDialogComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LeaveConfirmationDialogComponent>) {
    super()
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
