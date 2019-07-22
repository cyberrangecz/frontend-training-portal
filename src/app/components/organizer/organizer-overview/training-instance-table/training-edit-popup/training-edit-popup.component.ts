import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TrainingInstance} from "../../../../../model/training/training-instance";
import {BaseComponent} from "../../../../base.component";

@Component({
  selector: 'training-edit-popup',
  templateUrl: './training-edit-popup.component.html',
  styleUrls: ['./training-edit-popup.component.css']
})
/**
 * Popup dialog with component for training instance editing.
 */
export class TrainingEditPopupComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrainingEditPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainingInstance) {
    super();
  }

  ngOnInit() {
  }

  closeWithSuccess() {
    this.dialogRef.close({
      type: 'confirm',
    });
  }

}
