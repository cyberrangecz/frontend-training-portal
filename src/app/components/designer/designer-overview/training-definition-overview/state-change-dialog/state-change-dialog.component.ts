import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TrainingDefinitionStateEnum} from '../../../../../model/enums/training-definition-state.enum';

@Component({
  selector: 'app-state-change-dialog',
  templateUrl: './state-change-dialog.component.html',
  styleUrls: ['./state-change-dialog.component.css']
})
export class StateChangeDialogComponent implements OnInit {

  displayedText: string;

  constructor(
    public dialogRef: MatDialogRef<StateChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.createDisplayedText()
  }

  confirm() {
    this.dialogRef.close({
      type: 'confirm'
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  private createDisplayedText() {
    if (this.data.toState === TrainingDefinitionStateEnum.Released) {
      this.displayedText = "You won't be able to edit this training definition."
    }
    if (this.data.toState === TrainingDefinitionStateEnum.Archived) {
      this.displayedText = "You won't be able to edit and change state of this training definition."
    }
    if (this.data.toState === TrainingDefinitionStateEnum.Unreleased) {
      this.displayedText = "You or other authors will be able to edit this training definition"
    }
  }
}
