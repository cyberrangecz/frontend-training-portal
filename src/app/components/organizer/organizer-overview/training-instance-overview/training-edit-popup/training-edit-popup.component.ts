import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TrainingInstance} from "../../../../../model/training/training-instance";

@Component({
  selector: 'training-edit-popup',
  templateUrl: './training-edit-popup.component.html',
  styleUrls: ['./training-edit-popup.component.css']
})
/**
 * Popup dialog with component for training instance editing.
 */
export class TrainingEditPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingInstance
  ) { }

  ngOnInit() {
  }

  closeWithSuccess() {
    this.dialogRef.close({
      type: 'confirm'
    });
  }

}
