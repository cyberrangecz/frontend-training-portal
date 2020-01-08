import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {RevealHintDialogComponent} from '../reveal-hint-dialog/reveal-hint-dialog.component';

/**
 * Popup dialog asking for confirmation of revelation of a solution to a game level
 */
@Component({
  selector: 'kypo2-reveal-solution-dialog',
  templateUrl: './reveal-solution-dialog.component.html',
  styleUrls: ['./reveal-solution-dialog.component.css']
})
export class RevealSolutionDialogComponent implements OnInit {

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
