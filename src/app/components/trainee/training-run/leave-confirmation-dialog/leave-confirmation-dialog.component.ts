import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-leave-confirmation-modal',
  templateUrl: './leave-confirmation-dialog.component.html',
  styleUrls: ['./leave-confirmation-dialog.component.css']
})
export class LeaveConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LeaveConfirmationDialogComponent>,
  ) { }

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
