import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TrainingDefinition} from "../../../../model/training/training-definition";
import {AlertService} from "../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../model/enums/alert-type.enum";
import {BaseComponent} from "../../../base.component";
import { CloneDialogFormGroup } from './clone-dialog-form-group';

@Component({
  selector: 'app-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css']
})
export class CloneDialogComponent extends BaseComponent implements OnInit {

  cloneDialogFormGroup: CloneDialogFormGroup;

  constructor(public dialogRef: MatDialogRef<CloneDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
              private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.cloneDialogFormGroup = new CloneDialogFormGroup();
    this.clonedDefinitionTitle.setValue( 'Clone of ' + this.data.title);
  }

  get clonedDefinitionTitle(){return this.cloneDialogFormGroup.formGroup.get('clonedDefinitionTitle');}

  confirm() {
    if (this.cloneDialogFormGroup.formGroup.valid)
    this.dialogRef.close({
      type: 'confirm',
      title: this.clonedDefinitionTitle.value
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
