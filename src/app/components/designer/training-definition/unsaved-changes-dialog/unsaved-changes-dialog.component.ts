import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.css']
})
/**
 * Popup dialog component to confirm if user wants to leave without saving changes
 */
export class UnsavedChangesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnsavedChangesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
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
