import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'user-action-dialog',
  templateUrl: './user-action-dialog.component.html',
  styleUrls: ['./user-action-dialog.component.css']
})
/**
 * Component of a popup dialog to display data based on users action in the game level.
 * Is used to confirm if user wants to take hint or solution and to inform user about incorrectly submitted flag
 */
export class UserActionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {

  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    })
  }

  cancel() {
    this.dialogRef.close();
  }

}
