import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'kypo2-reveal-hint-dialog',
  templateUrl: './reveal-hint-dialog.component.html',
  styleUrls: ['./reveal-hint-dialog.component.css']
})
/**
 * Popup dialog asking for confirmation of revelation of a hint in a game level
 */
export class RevealHintDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevealHintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {

  }

  /**
   * Closes the dialog with result 'confirm'
   */
  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    });
  }

  /**
   * Closes the dialog with no result
   */
  cancel() {
    this.dialogRef.close();
  }

}
