import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {BaseComponent} from '../../../base.component';
import { CloneDialogFormGroup } from './clone-dialog-form-group';

@Component({
  selector: 'kypo2-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css']
})
/**
 * Dialog to select name of cloned training definition
 */
export class CloneDialogComponent extends BaseComponent implements OnInit {

  cloneDialogFormGroup: CloneDialogFormGroup;

  constructor(public dialogRef: MatDialogRef<CloneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition) {
    super();
  }

  ngOnInit() {
    this.cloneDialogFormGroup = new CloneDialogFormGroup();
    this.clonedDefinitionTitle.setValue( 'Clone of ' + this.data.title);
  }

  get clonedDefinitionTitle() {return this.cloneDialogFormGroup.formGroup.get('clonedDefinitionTitle'); }

  confirm() {
    if (this.cloneDialogFormGroup.formGroup.valid) {
    this.dialogRef.close({
      type: 'confirm',
      title: this.clonedDefinitionTitle.value
    });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
