import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './action-confirmation-dialog.component.html',
  styleUrls: ['./action-confirmation-dialog.component.css']
})
export class ActionConfirmationDialog extends BaseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ActionConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, action: string, title: string, additionalInfo: string }) {
    super();
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
