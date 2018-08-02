import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TrainingInstance} from "../../../../../model/training/training-instance";

@Component({
  selector: 'training-delete-dialog',
  templateUrl: './training-delete-dialog.component.html',
  styleUrls: ['./training-delete-dialog.component.css']
})
/**
 * Popup dialog component to confirm delete action of training instance
 */
export class TrainingDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingInstance
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
