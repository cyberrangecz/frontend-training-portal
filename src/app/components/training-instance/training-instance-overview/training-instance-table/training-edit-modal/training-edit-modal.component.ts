import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TrainingInstance} from '../../../../../model/training/training-instance';
import {BaseComponent} from '../../../../base.component';

@Component({
  selector: 'kypo2-training-edit-popup',
  templateUrl: './training-edit-modal.component.html',
  styleUrls: ['./training-edit-modal.component.css']
})
/**
 * Popup dialog with component for training instance editing.
 */
export class TrainingEditModalComponent extends BaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrainingEditModalComponent>,
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
