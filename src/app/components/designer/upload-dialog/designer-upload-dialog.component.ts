import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {AlertTypeEnum} from "../../../model/enums/alert-type.enum";
import {UploadService} from "../../../services/shared/upload.service";
import {TrainingDefinition} from '../../../model/training/training-definition';
import {TrainingDefinitionFacade} from '../../../services/facades/training-definition-facade.service';
import {SandboxDefinitionFacade} from "../../../services/facades/sandbox-definition-facade.service";

@Component({
  selector: 'designer-training-upload-dialog',
  templateUrl: './designer-upload-dialog.component.html',
  styleUrls: ['./designer-upload-dialog.component.css']
})
/**
 * Component of training definition upload dialog window
 */
export class DesignerUploadDialogComponent implements OnInit {

  selectedFile: File;
  uploadInProgress = false;

  constructor(public dialogRef: MatDialogRef<DesignerUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private trainingDefinitionFacade: TrainingDefinitionFacade,
              private sandboxDefinitionFacade: SandboxDefinitionFacade) {
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
    if (this.data.type == 'sandbox') {
      this.uploadSandboxDefinition()
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

  private uploadSandboxDefinition() {
    this.uploadInProgress = true;
    this.sandboxDefinitionFacade.uploadSandboxDefinition(this.selectedFile)
      .subscribe(
        resp => this.uploadSuccess('Sandbox Definition was successfully uploaded'),
        err => this.uploadFailure(err)
      )
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

