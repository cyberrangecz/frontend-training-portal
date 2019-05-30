import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TrainingDefinition} from "../../../../../model/training/training-definition";
import {AlertService} from "../../../../../services/shared/alert.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";

@Component({
  selector: 'app-clone-dialog',
  templateUrl: './clone-dialog.component.html',
  styleUrls: ['./clone-dialog.component.css']
})
export class CloneDialogComponent implements OnInit {

  clonedDefinitionTitle: string;

  constructor(
    public dialogRef: MatDialogRef<CloneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TrainingDefinition,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.clonedDefinitionTitle = 'Clone of ' + this.data.title;
  }

  confirm() {
    if (this.validateInput())
    this.dialogRef.close({
      type: 'confirm',
      title: this.clonedDefinitionTitle
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  private validateInput(): boolean {
    if (!this.clonedDefinitionTitle || this.clonedDefinitionTitle.replace(/\s/g, '') === '') {
      this.alertService.emitAlert(AlertTypeEnum.Error,'Title cannot be empty');
      return false;
    }
    return true;
  }

}
