import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'reveal-hint-dialog',
  templateUrl: './reveal-hint-dialog.component.html',
  styleUrls: ['./reveal-hint-dialog.component.css']
})
/**
 * Component of a popup dialog to display confirm taking of a hint by user.
 */
export class RevealHintDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevealHintDialogComponent>,
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
