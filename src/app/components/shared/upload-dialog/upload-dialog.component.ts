import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AlertTypeEnum} from "../../../enums/alert-type.enum";
import {HttpClient} from "@angular/common/http";
import {UploadService} from "../../../services/data-setters/upload.service";

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
              private uploadService: UploadService){

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
    this.uploadInProgress = true;
    this.uploadService.upload(this.selectedFile).subscribe(resp => {
      // TODO: display result based on the response
      const result = {
        type: AlertTypeEnum.Success,
        message: 'Training was successfully uploaded.'
      };
      this.dialogRef.close(result)
    });
  }

  /**
   * Removes selected file
   */
  clearFile() {
    this.selectedFile = null;
  }
}

