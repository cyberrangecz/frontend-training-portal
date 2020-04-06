import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TrainingDefinition} from 'kypo-training-model';
import {KypoBaseComponent} from 'kypo-common';
import {CloneDialogFormGroup} from './clone-dialog-form-group';
import {takeWhile} from 'rxjs/operators';

/**
 * Displays dialog with a form to select name of cloned training definition
 */
@Component({
  selector: 'kypo2-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloneDialogComponent extends KypoBaseComponent implements OnInit {

  cloneDialogFormGroup: CloneDialogFormGroup;
  valid = true;

  constructor(public dialogRef: MatDialogRef<CloneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition) {
    super();
  }

  get clonedDefinitionTitle() {return this.cloneDialogFormGroup.formGroup.get('clonedDefinitionTitle'); }

  ngOnInit() {
    this.cloneDialogFormGroup = new CloneDialogFormGroup();
    this.clonedDefinitionTitle.setValue( 'Clone of ' + this.data.title);
    this.cloneDialogFormGroup.formGroup.valueChanges
      .pipe(
        takeWhile(_ => this.isAlive)
      ).subscribe(_ => this.valid = this.cloneDialogFormGroup.formGroup.valid);
  }

  /**
   * Closes the dialog with 'confirm' result and inserted title of clened training definition
   */
  confirm() {
    if (this.cloneDialogFormGroup.formGroup.valid) {
    this.dialogRef.close({
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
