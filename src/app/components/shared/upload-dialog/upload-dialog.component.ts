import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AlertTypeEnum} from "../../../enums/alert-type.enum";
import {UploadService} from "../../../services/upload.service";
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionFacade} from '../../../services/facades/training-definition-facade.service';

@Component({
  selector: 'designer-training-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
/**
 * Component of training definition upload dialog window
 */
export class UploadDialogComponent implements OnInit {

  selectedFile: File;
  uploadInProgress = false;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
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
        resp => {
          const result = {
            type: AlertTypeEnum.Success,
            message: 'Training definition was successfully uploaded.'
          };
          this.uploadInProgress = false;
          this.dialogRef.close(result)
        },
        err => {
          const result = {
            type: AlertTypeEnum.Error,
            message: 'File upload failed.'
          };
          this.uploadInProgress = false;
          this.dialogRef.close(result)
        });
  }
}

