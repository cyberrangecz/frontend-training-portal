import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-state-change-dialog',
  templateUrl: './state-change-dialog.component.html',
  styleUrls: ['./state-change-dialog.component.css']
})
export class StateChangeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StateChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

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
