import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TrainingDefinitionFacade} from "../../../../../services/facades/training-definition-facade.service";
import {AlertTypeEnum} from "../../../../../model/enums/alert-type.enum";
@Component({
  selector: 'designer-training-upload-dialog',
  templateUrl: './training-definition-upload-dialog.component.html',
  styleUrls: ['./training-definition-upload-dialog.component.css']
})
/**
 * Component of training definition upload dialog window
 */
export class TrainingDefinitionUploadDialogComponent implements OnInit {

  selectedFile: File;
  uploadInProgress = false;

  constructor(public dialogRef: MatDialogRef<TrainingDefinitionUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private trainingDefinitionFacade: TrainingDefinitionFacade) {
  }

  ngOnInit() {
  }

  /**
   * Cancels the upload and closes the dialog window
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Uploads chosen file to a server and displays result of the upload
   */
  upload() {
    if (this.data.type == 'training') {
      this.uploadTrainingDefinition()
    }
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }

  private uploadTrainingDefinition() {
    this.uploadInProgress = true;
    this.trainingDefinitionFacade.uploadTrainingDefinition(this.selectedFile)
      .subscribe(
        resp => this.uploadSuccess('Training definition was successfully uploaded.'),
        err => this.uploadFailure(err));
  }

  private uploadSuccess(message: string) {
    const result = {
      type: AlertTypeEnum.Success,
      message: message
    };
    this.uploadInProgress = false;
    this.dialogRef.close(result);
  }

  private uploadFailure(err) {
    const result = {
      type: AlertTypeEnum.Error,
      message: 'File upload failed.'
    };
    this.uploadInProgress = false;
    this.dialogRef.close(result);
  }
}

