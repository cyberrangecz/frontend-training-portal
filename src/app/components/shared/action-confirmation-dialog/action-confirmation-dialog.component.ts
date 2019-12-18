import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../base.component';
import { ActionEnum } from './action-enum';

@Component({
  selector: 'kypo2-action-confirmation-dialog',
  templateUrl: './action-confirmation-dialog.component.html',
  styleUrls: ['./action-confirmation-dialog.component.css']
})
/***
 * PRESENTATIONAL
 * Generic component to ask for confirmation of some action in dialog
 */
export class ActionConfirmationDialogComponent extends BaseComponent implements OnInit {

  message: string;
  confirmButtonName: string;
  cancelButtonName: string;
  constructor(
    public dialogRef: MatDialogRef<ActionConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, action: ActionEnum, title: string, additionalInfo: string }) {
    super();
  }

  ngOnInit() {
    switch (this.data.action) {
      case ActionEnum.CREATE: this.confirmButtonName = 'Save'; this.cancelButtonName = 'Discard'; break;
      case ActionEnum.CLONE: this.confirmButtonName = 'Clone'; this.cancelButtonName = 'Cancel'; break;
      case ActionEnum.EDIT: this.confirmButtonName = 'Save'; this.cancelButtonName = 'Discard'; break;
      case ActionEnum.ACCESS: this.confirmButtonName = 'Access'; this.cancelButtonName = 'Cancel'; break;
      case ActionEnum.REMOVE: this.message = 'Do you really want to remove '; this.confirmButtonName = 'Remove'; this.cancelButtonName = 'Cancel'; break;
      case ActionEnum.DELETE: this.message = 'Do you really want to delete '; this.confirmButtonName = 'Delete'; this.cancelButtonName = 'Cancel'; break;
    }
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
