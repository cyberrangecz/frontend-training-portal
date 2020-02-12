import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RevealHintDialogComponent} from '../reveal-hint-dialog/reveal-hint-dialog.component';

/**
 * Popup window informing that the wrong flag was submitted
 */
@Component({
  selector: 'kypo2-submit-flag-dialog',
  templateUrl: './wrong-flag-dialog.component.html',
  styleUrls: ['./wrong-flag-dialog.component.css']
})
export class WrongFlagDialogComponent implements OnInit {

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
