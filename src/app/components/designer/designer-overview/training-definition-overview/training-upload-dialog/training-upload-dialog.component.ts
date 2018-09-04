import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {AlertTypeEnum} from "../../../../../enums/alert-type.enum";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'designer-training-upload-dialog',
  templateUrl: './training-upload-dialog.component.html',
  styleUrls: ['./training-upload-dialog.component.css']
})
/**
 * Component of training definition upload dialog window
 */
export class TrainingUploadDialogComponent implements OnInit {

  uploadedFile;

  constructor(public dialogRef: MatDialogRef<TrainingUploadDialogComponent>,
              private http: HttpClient){

  }

  ngOnInit() {
  }

  /**
   * Cancels the upload and closes the dialog window
   */
  cancel() {
    // Only for testing purposes, return null in production
    const result = {
      type: AlertTypeEnum.Info,
      message: 'File upload was canceled.'
    };
    this.dialogRef.close(result);
    // this.dialogRef.close(null);
  }

  /**
   * Uploads chosen file to a server and displays result of the upload
   */
  upload() {
    // TODO: upload file and return result
    const result = {
      type: AlertTypeEnum.Success,
      message: 'Training was succesfully uploaded.'
    };
    this.dialogRef.close(result)
  }

  /**
   * Enables user to choose the file which should be uploaded
   */
  chooseFile() {
    // TODO: choose file
  }
}
