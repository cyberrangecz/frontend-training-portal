import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {TrainingDefinition} from '../../../../model/training/training-definition';
import {BaseComponent} from '../../../base.component';
import { CloneDialogFormGroup } from './clone-dialog-form-group';

/**
 * Displays dialog with a form to select name of cloned training definition
 */
@Component({
  selector: 'kypo2-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css']
})
export class CloneDialogComponent extends BaseComponent implements OnInit {

  cloneDialogFormGroup: CloneDialogFormGroup;

  constructor(public dialogRef: MatDialogRef<CloneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition) {
    super();
  }

  get clonedDefinitionTitle() {return this.cloneDialogFormGroup.formGroup.get('clonedDefinitionTitle'); }

  ngOnInit() {
    this.cloneDialogFormGroup = new CloneDialogFormGroup();
    this.clonedDefinitionTitle.setValue( 'Clone of ' + this.data.title);
  }

  /**
   * Closes the dialog with 'confirm' result and inserted title of clened training definition
   */
  confirm() {
    if (this.cloneDialogFormGroup.formGroup.valid) {
    this.dialogRef.close({
      type: 'confirm',
      title: this.clonedDefinitionTitle.value
    });
    }
  }

  /**
   * Closes the dialog with no result
   */
  cancel() {
    this.dialogRef.close();
  }

}
