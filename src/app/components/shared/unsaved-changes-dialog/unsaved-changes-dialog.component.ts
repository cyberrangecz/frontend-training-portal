import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'kypo2-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.css']
})
/**
 * PRESENTATIONAL
 * Popup dialog component to confirm if user wants to leave without saving changes
 */
export class UnsavedChangesDialogComponent extends BaseComponent implements OnInit {

  messages: string[];
  saveOption: boolean;

  constructor(public dialogRef: MatDialogRef<UnsavedChangesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { payload: string[], saveOption: boolean }) {
    super();
    this.messages = data.payload;
    this.saveOption = this.data.saveOption;
  }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    });
  }

  save() {
    this.dialogRef.close({
      type: 'save'
    });
  }


  cancel() {
    this.dialogRef.close();
  }
}
